import { html, component, useState } from 'haunted';
import { svg, css } from 'lit-html';
import {classMap} from 'lit-html/directives/class-map.js';

import svgJson from './svg.json.js';

function HexGrid({ board, message, action, resources, roll, phase, myTurn, socket}) {

  const [selectedRoads, setSelectedRoads] = useState( new Set() );
  const [selectedNodes, setSelectedNodes] = useState( new Set() );

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

  let enableHexagonHighlight = true;
  let enableBuildHighlight = true;

  // TODO: Fill in template string for hexagon grid
  return html`
    <svg viewBox=${svgViewBox}>
      <filter id="shadow">
        <feDropShadow dx="0.5" dy="1.0" stdDeviation="0.5"/>
      </filter>
      <g>
        <!-- Hexagons -->
        ${hexagons.map(({poly, resource}, idx) => {
          return svg`
            <polygon 
              points=${poly} 
              class="${resource} ${enableHexagonHighlight ? 'highlightHexagon' : ''}"
              @click=${enableHexagonHighlight ? () => selectHexagon(idx, socket) : () => {}}
              >
            </polygon>
          `;
        })}
        <!-- Numbers -->
        ${centroids.map(({x,y,number},idx) => {
          return svg`
            <circle cx=${x} cy=${y} r="21" class="centroid"/>
            <text x=${x} y=${y} dy="0.35em" text-anchor="middle" class="number">
              ${number}
            </text>
          `;
        })}
        <!-- Hexagon edges -->
        ${lines.map((line) => {
          return svg`
            <path d=${line} class="outlines"/>
          `;
        })}
        <!-- Brigand -->
        ${svg`
          <path 
            d=${svgJson['brigand']} 
            transform="scale(0.15) rotate(180) translate(${-1.0*brigand.x/0.15-280},${-1.0*brigand.y/0.15-320})" 
            style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
          />
        `}
        <!-- Roads -->
        ${roads.map(({path,color,opacity},idx) => {
          return svg`
            <path
              d=${path}
              stroke-width=14
              stroke=${color}
              stroke-opacity=${opacity}
              @click=${() => selectRoad(idx)}
              class=${classMap({
                highlightroad: enableBuildHighlight,
                selectedroad: selectedRoads.has(idx)
              })}
            />
          `;
        })}
      </g>
    </svg>

    <style>
      .block {
        fill: #a56666;
      }
      .rock {
        fill: #8d8c8c;
      }
      .timber {
        fill:#618961;
      }
      .cereal {
        fill: rgb(201, 174, 108);
      }
      .fiber {
        fill: rgb(232, 232, 238);
      }
      .desert {
        fill: rgb(175, 171, 108);
      }
      .outlines{
        stroke: black;
      }
      .centroid {
        fill: white;
        stroke: black;
      }
      .number {
        font-weight: bold;
        font-size: 24px;
      }
      path.highlightroad:hover {
        stroke-opacity: 1;
      }
      path.selectedroad {
        stroke-opacity: 1;
      }
      path.highlightnode:hover {
        /* fill-opacity: 1;
        stroke-opacity: 1; */
      }
      path.selectednode {
        /* fill-opacity: 1;
        stroke-opacity: 1; */
      }
      polygon.highlightHexagon:hover {
        fill: black;
      }
    </style>
  `;
}

function selectHexagon(index, socket) {
  console.log(index);
  // socket.emit('player-actions', {
  //   'moveBrigand': {
  //     pid: socket.id,
  //     hexInd: index
  //   }
  // }, response => {
  //   console.log(response.status);
  // });
}

function selectRoad(index) {
  console.log(index);
}

customElements.define("hex-grid", component(HexGrid));