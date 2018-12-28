/**
 * Sample draw Rectangle
 */

function draw (rects) {
    let d3svg = makeD3Svg();
    let svg = d3svg.Svg();
    let forground = svg.selectAll('g.base.forground');

    let COMPONENT = new Component();
    let routes = _ROUTES;

    let components = COMPONENT.resizeTree(COMPONENT.normalizeTree(routes));

    COMPONENT.draw(forground, components);
}

draw();
