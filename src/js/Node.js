import NodeLink from './NodeLink.js';

import { DrawerHierarchy } from './Drawer.js';

export default class Node {
    constructor() {
        this.drawer = new DrawerHierarchy();

        this.node_link = new NodeLink();
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Utility
    ///// ////////////////////////////////////////////////////////////////
    getFourSides  (data) {
        let port_r = 4;
        let margin =  4 + port_r;

        let x = data.position.x;
        let y = data.position.y;

        let w = data.size.w;
        let h = data.size.h;

        let top_left     = { x: x -     margin, y: y -     margin};
        let top_right    = { x: x + w + margin, y: y -     margin};
        let bottom_rigth = { x: x + w + margin, y: y + h + margin};
        let bottom_left  = { x: x -     margin, y: y + h + margin};

        return [
            { from: top_left,     to: top_right    },
            { from: top_right,    to: bottom_rigth },
            { from: bottom_rigth, to: bottom_left  },
            { from: bottom_left,  to: top_left     },
        ];
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////
    dataTemplate () {
        return {
            type: null,
            label: {
                contents: '',
                position: { x: 20, y: 20 },
                font: { size: 16, color: '#333333' },
            },
            position: null,
            size:     null,
            background: null,
            border: null,
            link: null,
            children: [],
            _id: null,
            _core: null,
            _class: 'NODE',
        };
    };
    normalizeBase (data) {
        let core = data._core;

        if (core.id || core.id===0)
            data._id = core.id;

        data.type = core.type || 'NODE';

        data.link = this.node_link.normalize(core.link);
    }
    normalize (data) {
        if (!data)
            return null;

        let new_data = this.dataTemplate();

        new_data._core = data;

        const children = data.children;
        if (children && children.length > 0)
            new_data.children = children.map((child) => {
                return this.normalize(child);
            });

        this.normalizeBase(new_data);

        let drawer = this.drawer;
        new_data.label      = drawer.normalizeLabel(new_data._core.label);
        new_data.size       = drawer.normalizeSize(new_data._core.size);
        new_data.position   = drawer.normalizePosition(new_data._core.position);
        new_data.border     = drawer.normalizeBorder(new_data._core.border);
        new_data.padding    = drawer.normalizePadding(new_data._core.padding);

        new_data.background = drawer.normalizeBackground(new_data._core.background);

        data._node = new_data;

        return new_data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Filter
    ///// ////////////////////////////////////////////////////////////////
    addFilterShadow (svg) {
        var filter = svg.append("defs")
            .append("filter")
            .attr("id", "drop-shadow")
            .attr("height", "130%");

        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 5)
            .attr("result", "blur");

        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 5)
            .attr("dy", 5)
            .attr("result", "offsetBlur");

        var feMerge = filter.append("feMerge");

        feMerge
            .append("feMergeNode")
            .attr("in", "offsetBlur");
        feMerge
            .append("feMergeNode")
            .attr("in", "SourceGraphic");
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    drawGroup (place, data, type) {
        return place.selectAll('g.' + type)
            .data([data], (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', type)
            .attr("transform", (d) => {
                return "translate(" +
                    d.position.x + "," +
                    d.position.y +
                    ")";
            })
            .attr('level',  (d) => { return d._level;});
    }
    drawBody (groups) {
        groups
            .append('rect')
            .attr('class', 'node-body')
            .attr('width', (d) => { return d.size.w; })
            .attr('height', (d) => { return d.size.h; })
            .attr('rx', (d) => { return (d.border && d.border.r) || 0; })
            .attr('ry', (d) => { return (d.border && d.border.r) || 0; })
            .attr('fill', (d) => {
                return d.background.color;
            })
            .attr('stroke', (d) => { return d.border.color; })
            .attr('stroke-width', (d) => { return d.border.width; });
    }
    drawLabel (groups) {
        groups
            .append('text')
            .attr('class', 'node-label')
            .attr('x',  (d) => {
                return d.label.position.x;
            })
            .attr('y', (d) => {
                return d.label.position.y;
            })
            .style('fill', (d) => {
                return d.label.font.color;
            })
            .attr('stroke', (d) => {
                return 'none';
            })
            .style('font-size', (d) => {
                return d.label.font.size;
            })
            .text((d) => {
                return d.label.contents;
            })
        ;
    }
    drawLink (groups) {
        let a_element = groups
            .filter((d) => d.link)
            .append('a')
            .attr('class', 'link-alt')
            .attr('href', (d) => {
                let url = d.link.url;

                if (!url)
                    return null;

                if (typeof(url) === "function")
                    return url(d);

                return url;
            })
            .attr('target', '_blank')
            .attr('rel', 'noopener noreferrer')
            .style('color', '#888888');

        a_element
            .filter((d) => d.link.icon)
            .append('image')
            .attr('x', (d) => d.link.position.x )
            .attr('y', (d) => d.link.position.y )
            .attr('width',  (d) => d.link.rectangle.w )
            .attr('height', (d) => d.link.rectangle.h )
            .attr('xlink:href', (d) => d.link.icon );

        a_element
            .filter((d) => !d.link.icon)
            .append('text')
            .attr('x', (d) => {
                return d.link.position.x;
            })
            .attr('y', (d) => {
                return d.link.position.y;
            })
            .style("font-size", (d) => {
                return '12px';
            })
            .style("display", (d) => {
                console.log(d.link);
                if (!d.link.url)
                    return 'none';

                return 'block';
            })
            .text((d) => {
                return 'link';
            });
    }
    draw (place, data) {
        let groups = this.drawGroup(place, data, 'node');

        this.drawBody(groups, data);
        this.drawLabel(groups, data);
        this.drawLink(groups, data);
    }
}
