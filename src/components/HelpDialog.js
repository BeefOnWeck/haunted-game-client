import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function HelpDialog({open,setOpen,resources,activePlayer}){

  return html`
    <sl-button id="help-button" variant="default" size="medium" circle @click=${() => setOpen(true)}>
      <sl-icon name="patch-question" label="Information"></sl-icon>
    </sl-button>
    <sl-dialog 
      label="Information"
      ?open=${open}
      @sl-after-hide=${() => setOpen(false)}
    >
      <div>
        Your name: 
      </div>
      <div id="active-player">
        Active player: ${activePlayer}
      </div>
      <div id="resource-list-long">
        ${Object.entries(resources).map(([name,value]) => {
          return html`
            <div class="resource ${name}">
              ${name}: ${value}
            </div>
          `;
        })}
      </div>

      <sl-button slot="footer" variant="neutral" @click=${() => setOpen(false)}>
        Close
      </sl-button>
    </sl-dialog>

    <style>
      #help-button {
        margin-left: 25px;
      }
      #help-button > sl-icon {
        font-size: 32px;
        margin-top: 3px;
      }
      sl-dialog > div {
        width: fit-content;
      }
      .resource {
        margin: 3px;
        padding: 5px;
        border: black;
        font-weight: bolder;
        border-radius: 5px;
        font-size: 20px;
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