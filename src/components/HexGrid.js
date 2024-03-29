import { html, component, useState, useEffect } from 'haunted';
import { svg } from 'lit-html';
import {classMap} from 'lit-html/directives/class-map.js';

import svgJson from './svg.json.js';

function HexGrid({ 
  board, 
  action,
  myTurn,
  selectedRoads,
  setSelectedRoads,
  selectedNodes,
  setSelectedNodes,
  key,
  socket}) {

  const {centroids, nodes, hexagons, numbers, roads, lines, villages, scorpion} = board;

  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setMoving(true);
    setTimeout(() => setMoving(false), 2000);
  },[scorpion?.x,scorpion?.y]);

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

  let enableBuildHighlight = myTurn && (action.includes('BuildStuff') || action.includes('PlaceVillageAndRoad'));
  let enableHexagonHighlight = myTurn && action.includes('MoveScorpion');

  return html`
    <svg viewBox=${svgViewBox}>
      <filter id="shadow" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5"/>
      </filter>
      <g>
        <!-- Hexagons -->
        ${hexagons.map(({poly, resource}, idx) => {
          return svg`
            <polygon 
              points=${poly} 
              class="${resource} ${enableHexagonHighlight ? 'highlightHexagon' : ''}"
              @click=${enableHexagonHighlight ? () => selectHexagon(idx, socket, key) : () => {}}
              >
            </polygon>
          `;
        })}
        <!-- Numbers -->
        ${centroids.map(({loc:{x, y}, number}, idx) => {
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
        <!-- Scorpion -->
        ${svg`
        <g class=${moving ? 'movingAnimation' : ''}>
          <path 
            id="scorpion"
            d=${svgJson['scorpion']} 
            transform="scale(0.15) rotate(180) translate(${-1.0*scorpion.x/0.15-280},${-1.0*scorpion.y/0.15-320})"
          />
        </g>
        `}
        <!-- Roads -->
        ${roads.map(({path,color,opacity},idx) => {
          return svg`
            <path
              d=${path}
              stroke-width=14
              stroke=${color}
              stroke-opacity=${opacity}
              @click=${() => select(idx, setSelectedRoads)}
              class=${classMap({
                highlightroad: enableBuildHighlight,
                selectedroad: selectedRoads.has(idx)
              })}
            />
          `;
        })}
        <!-- Nodes -->
        ${nodes.map(({x,y},idx) => {
          return svg`
            <circle cx=${x} cy=${y} r="1"/>
          `;
        })}
        <!-- Villages -->
        ${villages.map(({x,y,color,opacity},idx) => {
          return svg`
            <path
              d=${svgJson['village']}
              transform="translate(${x-20},${y-25}) scale(2)"
              stroke=${color}
              fill=${color}
              stroke-opacity=${opacity}
              fill-opacity=${opacity}
              style="filter:url(#shadow)"
              @click=${() => select(idx, setSelectedNodes)}
              class=${classMap({
                highlightnode: enableBuildHighlight,
                selectednode : selectedNodes.has(idx)
              })}
            />
          `;
        })}
      </g>
    </svg>

    <style>
      .Block {
        fill: #a56666;
      }
      .Rock {
        fill: #8d8c8c;
      }
      .Timber {
        fill:#618961;
      }
      .Cereal {
        fill: rgb(201, 174, 108);
      }
      .Fiber {
        fill: rgb(232, 232, 238);
      }
      .Desert {
        fill: rgb(175, 171, 108);
      }
      .outlines{
        stroke: black;
      }
      .centroid {
        fill: white;
        stroke: black;
        pointer-events: none;
      }
      .number {
        font-weight: bold;
        font-size: 24px;
        pointer-events: none;
      }
      path.highlightroad:hover {
        stroke-opacity: 1;
      }
      path.selectedroad {
        stroke-opacity: 1;
      }
      path.highlightnode:hover {
        fill-opacity: 1;
        stroke-opacity: 1;
      }
      path.selectednode {
        fill-opacity: 1;
        stroke-opacity: 1;
      }
      polygon.highlightHexagon:hover {
        fill: black;
      }
      @keyframes fadeInFromAbove {
        0% {
          transform: translateY(-10%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .movingAnimation {
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-name: fadeInFromAbove;
      }
      #scorpion {
        fill:#231f20;
        fill-opacity:1;
        fill-rule:nonzero;
        stroke:none
      }
    </style>
  `;
}

function selectHexagon(index, socket, key) {

  let target = [['Hex',index]];

  while (target.length < 5) target.push(null);

  let command = {
    action: 'MoveScorpion',
    player: key,
    target,
    trade: null
  };

  socket.send(JSON.stringify(command));
}

function select(index, setSelected) {
  let indexInt = parseInt(index);
  setSelected(prevState => {
    let newState = new Set(prevState);
    if (newState.has(indexInt)) {
      newState.delete(indexInt);
    } else {
      newState.add(indexInt);
    }
    return newState;
  });
}

customElements.define("hex-grid", component(HexGrid));