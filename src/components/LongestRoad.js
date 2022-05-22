import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function LongestRoad({longestRoadColor}){

  const colorString = 'color:' + longestRoadColor;

  // TODO: Add a badge with the color of the player with the longest road
  return html`
    <div id="longest-road-badge">
      <sl-icon name="trophy-fill" label="Longest Road" style=${colorString}>
      </sl-icon>
    </div>
    
    <style>
      #longest-road-badge {
        display: inline-block;
        vertical-align: middle;
      }
      #longest-road-badge > sl-icon {
        font-size: 4vw;
        border: solid;
        border-radius: 10px;
        border-width: medium;
        border-color: white;
        padding: 2px;
        background-color: white;
        position: relative;
        top: 3px;
        display: inline-block;
      }
      #longest-road-badge > sl-icon::part(base) {
        background-color: white;
        display: inline-block;
      }
    </style>
  `;
}


customElements.define("longest-road", component(LongestRoad));