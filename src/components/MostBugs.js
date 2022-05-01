import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function MostBugs({mostBugsColor, yourBugs}){

  const colorString = 'color:' + mostBugsColor;

  // TODO: Add a badge with the color of the player with the longest road
  return html`
    <div id="most-bugs-badge">
      <sl-icon name="bug-fill" label="Longest Road" style=${colorString}>
      </sl-icon>
      <sl-badge pill>${yourBugs}</sl-badge>
    </div>
    
    <style>
      #most-bugs-badge {
        display: inline-block;
        margin-left: 30px;
        vertical-align: middle;
      }
      #most-bugs-badge > sl-icon {
        font-size: 38px;
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
      #most-bugs-badge > sl-icon::part(base) {
        background-color: white;
        display: inline-block;
      }
      #most-bugs-badge > sl-badge::part(base) {
        width: 20px;
        height: 20px;
        z-index: 1;
        position: relative;
        top: -40px;
        left: -13px;
        background-color: white;
        border: solid 1px black;
        font-weight: bolder;
        color: black;
        font-size: 14px;
        vertical-align: center;
      }
    </style>
  `;
}


customElements.define("most-bugs", component(MostBugs));