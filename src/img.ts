// Functions related to SVG creation and manipulation.

function makeTileSVG(n: number): SVGSVGElement {

// Makes an SVG with the tile number n on it.

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", "50");
    cir.setAttribute("cy", "50");
    cir.setAttribute("r", "50");
    cir.setAttribute("stroke-width", "2");
    cir.setAttribute("fill", "#d75480");
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50");
    text.setAttribute("y", "65");
    text.setAttribute("font-size", "50");
    text.setAttribute("font-family", "sans-serif");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.innerHTML = (n+1).toString();
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.appendChild(cir);
    g.appendChild(text);
    svg.appendChild(g);
    return svg;
}
