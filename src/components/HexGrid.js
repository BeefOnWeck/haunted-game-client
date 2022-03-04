import { html, component } from 'haunted';

function HexGrid({ board, message, action, resources, roll, phase, myTurn }) {

  const {centroids, nodes, hexagons, numbers, roads, lines, villages, brigand} = board;

  let svgViewBox = "0 0 100 100";
  if (nodes.length > 0) {
    let nodeBounds = nodes.reduce((acc, cv) => {
      return [
        cv.x < acc[0] ? cv.x : acc[0],
        cv.x >= acc[1] ? cv.x : acc[1],
        cv.y < acc[2] ? cv.y : acc[2],
        cv.y >= acc[3] ? cv.y : acc[3] 
      ];
    },[9999, -9999, 9999, -9999]);

    // Compute the dimensions of the bounding box
    let widthX = (nodeBounds[1]-nodeBounds[0]);
    widthX = widthX > 0 ? widthX : 100;
    let widthY = (nodeBounds[3]-nodeBounds[2]);
    widthY = widthY > 0 ? widthY : 100;

    // Set the SVG viewBox, with a 10% margin on the borders
    svgViewBox = Math.round(nodeBounds[0]-widthX/20).toString() + " " +
      Math.round(nodeBounds[2]-widthY/20).toString() + " " +
      Math.round(widthX*1.1).toString() + " " +
      Math.round(widthY*1.1).toString();
  }

  // TODO: Fill in template string for hexagon grid
  return html`
    <svg viewBox=${svgViewBox}>

    </svg>
  `;
}

customElements.define("hex-grid", component(HexGrid));