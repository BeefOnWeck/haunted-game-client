import { html, component } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function HelpDialog({open,setOpen,resources,activePlayer}){

  return html`
    <sl-button variant="default" size="medium" circle @click=${() => setOpen(true)}>
      <sl-icon name="question-lg" label="Information"></sl-icon>
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
  `;
}


customElements.define("help-dialog", component(HelpDialog));