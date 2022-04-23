import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function MostBugs({mostBugs}){

  // TODO: Add a badge with the color of the player with the longest road
  return html`
    <div id="most-bugs-badge">
      <sl-icon name="bug-fill" label="Longest Road" style="color:lightgray">
      </sl-icon>
      <sl-badge pill></sl-badge>
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


customElements.define("most-bugs", component(MostBugs));