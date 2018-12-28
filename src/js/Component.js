class Component {
    constructor () {}
    dataTemplate () {
        return {
            x: Math.round( Math.random()*1000 ) - 500,
            y: Math.round( Math.random()*1000 ) - 500,
            w: 222,
            h: 111,
            r: 0,
            href: '#',
            stroke: {
                color: '#333333',
                width: 1
            },
            background: {
                color: '#fff'
            }
        };
    }
    normalize (data) {
        let new_data = this.dataTemplate();

        if (data.name) new_data.name = data.name;
        if (data.href) new_data.href = data.href;
        if (data.x)    new_data.x    = data.x;
        if (data.y)    new_data.y    = data.y;
        if (data.w)    new_data.w    = data.w;
        if (data.h)    new_data.h    = data.h;
        new_data.children = data.children ? data.children : [];

        return new_data;
    }
    normalizeTree (list) {
        let new_list = [];

        for (var i in list) {
            let node = this.normalize(list[i]);
            node.children = this.normalizeTree(node.children);
            new_list.push(node);
        }

        return new_list;
    }
    resizeTree(list) {
        return list;
    }
    drawText (g) {
        let a = g.append('a')
            .attr('href', (d) => { return d.href; });

        a.append('text')
            .attr('class', 'component')
            .attr('x', (d) => { return 11;})
            .attr('y', (d) => { return 11 + 14;})
            .text((d) => { return d.name;});
    }
    drawRect (g) {
        g.append('rect')
            .attr('class', 'component')
            .attr('width', (d) => { return d.w;})
            .attr('height', (d) => { return d.h;})
            .attr('rx', (d) => { return d.r;})
            .attr('ry', (d) => { return d.r;})
            .attr('fill', (d) => {
                return d.background.color;
            })
            .attr('stroke', (d) => { return d.stroke.color; })
            .attr('stroke-width', (d) => { return d.stroke.width; });
    }
    drawG (place, data) {
        return place.selectAll('g.component')
            .data(data, (d) => { return d.code; })
            .enter()
            .append('g')
            .attr('class', 'component')
            .attr('transform', (d) => {
                return 'translate(' + d.x + ', ' + d.y + ')';
            });
    }
    draw (place, data) {
        let g = this.drawG(place, data);

        if (g.size()==0) return;

        this.drawRect(g);
        this.drawText(g);
        this.draw(g, (d) => { return d.children; });
    }
}
