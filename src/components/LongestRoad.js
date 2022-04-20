import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function LongestRoad({longestRoad}){

  return html`
    <div id="longest-road-badge">
      <sl-icon name="trophy" label="Longest Road"></sl-icon>
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