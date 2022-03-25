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
    </style>
  `;
}


customElements.define("help-dialog", component(HelpDialog));