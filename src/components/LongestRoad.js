import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function LongestRoad({longestRoad}){

  // TODO: Add a badge with the color of the player with the longest road
  return html`
    <div id="longest-road-badge">
      <sl-icon name="trophy" label="Longest Road">
      </sl-icon>
      <sl-badge pill></sl-badge>
    </div>
    
    <style>
      #longest-road-badge {
        display: inline-block;
        margin-left: 30px;
        vertical-align: middle;
      }
      #longest-road-badge > sl-icon {
        font-size: 38px;
        font-weight: bold;
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
      #longest-road-badge > sl-badge::part(base) {
        width: 15px;
        height: 15px;
        z-index: 1;
        position: relative;
        top: -36px;
        left: -13px;
        background-color: white;
        border: solid 1px black;
      }
    </style>
  `;
}


customElements.define("longest-road", component(LongestRoad));