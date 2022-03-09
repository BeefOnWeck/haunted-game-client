import { html, component, useState } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function TradeDialog({
  open,
  setOpen
}){

  return html`
    <sl-dialog 
      label="Dialog" 
      class="dialog-overview"
      ?open=${open}
      @sl-after-hide=${() => setOpen(false)}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <sl-button 
        slot="footer" 
        variant="primary"
        @click=${() => setOpen(false)}
      >
        Close
      </sl-button>
    </sl-dialog>
  `;

}

customElements.define("trade-dialog", component(TradeDialog));