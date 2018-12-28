/**
 * Sample draw Rectangle
 */

function draw (rects) {
    let d3svg = makeD3Svg();
    let svg = d3svg.Svg();
    let forground = svg.selectAll('g.base.forground');

    forground.selectAll('rect.sample')
        .data(rects, (d) => { return d._id; })
        .enter()
        .append('rect')
        .attr('class', 'sample')
        .attr('x', (d) => { return d.x;})
        .attr('y', (d) => { return d.y;})
        .attr('width', (d) => { return d.size.w;})
        .attr('height', (d) => { return d.size.h;})
        .attr('rx', (d) => { return d.r;})
        .attr('ry', (d) => { return d.r;})
        .attr('fill', (d) => {
            console.log(d.background.color);
            return d.background.color;
        })
        .attr('stroke', (d) => { return d.stroke.color; })
        .attr('stroke-width', (d) => { return d.stroke.width; });

}


let rects = [
    // 対角線あり 四角
    {
        x: Math.round( Math.random()*1000 ) - 500,
        y: Math.round( Math.random()*1000 ) - 500,
        size: { w: 222, h: 333 },
        r: 0,
        stroke: {
            color: '#333333',
            width: 1
        },
        background: {
            color: '#fff'
        },
        // 対角線
        diagonal : {
            color: '#333333',
            width: 1
        }
    },
    // 対角線なし 四角
    {
        x: Math.round( Math.random()*1000 ) - 500,
        y: Math.round( Math.random()*1000 ) - 500,
        size: { w: 222, h: 333 },
        r: 0,
        stroke: {
            color: '#333333',
            width: 1
        },
        background: {
            color: '#fff'
        },
        // 対角線
        diagonal : null
    },
    // 対角線なし 四角 角丸
    {
        x: Math.round( Math.random()*1000 ) - 500,
        y: Math.round( Math.random()*1000 ) - 500,
        size: { w: 222, h: 333 },
        r: 8,
        stroke: {
            color: '#333333',
            width: 1
        },
        background: {
            color: '#fff'
        },
        // 対角線
        diagonal : null
    }
];


draw(rects);
