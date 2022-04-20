import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function HelpDialog({open,setOpen,myName,resources,activePlayer,theWinner,longestRoad}){

  return html`
    <sl-button id="help-button" variant="default" size="large" circle @click=${() => setOpen(true)}>
      <sl-icon name="patch-question" label="Information"></sl-icon>
    </sl-button>
    <sl-dialog 
      label="Welcome to Hexagon Island!"
      ?open=${open}
      @sl-after-hide=${() => setOpen(false)}
    >
      <ul>
        <li>Your name: ${myName} </li>
        <li>Active player: ${activePlayer} </li>
        <li>The winner: ${theWinner}</li>
        <li>Longest road: ${longestRoad}</li>
        <li>Most ninjas: </li>
        <li>Your resources:
          <div id="resource-list-long">
            ${Object.entries(resources).map(([name,value]) => {
              return html`
                <div class="resource ${name}">
                  ${name}: ${value}
                </div>
              `;
            })}
          </div>
        </li>
      </ul>

      <sl-button slot="footer" variant="neutral" @click=${() => setOpen(false)}>
        Close
      </sl-button>
    </sl-dialog>

    <style>
      #help-button {
        margin-left: 30px;
      }
      #help-button > sl-icon {
        font-size: 44px;
        margin-top: 2px;
      }
      sl-dialog > div {
        width: fit-content;
        display: flex;
        margin-bottom: 10px;
      }
      ul {
        position: relative;
        list-style: none;
        margin-left: 0;
        padding-left: 1.75em;
      }
      ul li:before {
        content: "⬡";
        position: absolute;
        left: 5px;
        font-weight: bolder;
      }
      ul > li {
        text-align: left;
        padding-top: 3px;
      }
      #your-resources {
        text-align: left;
      }
      .resource {
        margin: 3px;
        padding: 5px;
        border: black;
        font-weight: bolder;
        border-radius: 5px;
        font-size: 16px;
        width: fit-content;
        display: inline-block;
      }
      .block {
        background-color: #a56666;
        color: whitesmoke;
      }
      .rock {
        background-color: #8d8c8c;
        color: whitesmoke;
      }
      .timber {
        background-color:#618961;
        color: whitesmoke;
      }
      .cereal {
        background-color: rgb(230, 192, 97);
      }
      .fiber {
        background-color: rgb(232, 232, 238);
      }
    </style>
  `;
}


customElements.define("help-dialog", component(HelpDialog));