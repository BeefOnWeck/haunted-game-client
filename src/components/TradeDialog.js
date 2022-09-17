import { html, component, useState } from 'haunted';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function TradeDialog({open,setOpen,key,socket}){

  const [have, setHave] = useState('');
  const [want, setWant] = useState('');

  return html`
    <sl-dialog 
      label="Trade 3:1"
      ?open=${open}
      @sl-after-hide=${() => setOpen(false)}
    >
      <div class="dialog-column">
        <div class="dialog-row">Have x3:</div>
        <sl-button 
          variant=${have == 'Block' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'Block')} 
          class="resource"
        >
          Block
        </sl-button>
        <sl-button 
          variant=${have == 'Timber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'Timber')} 
          class="resource"
        >
          Timber
        </sl-button>
        <sl-button 
          variant=${have == 'Fiber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'Fiber')} 
          class="resource"
        >
          Fiber
        </sl-button>
        <sl-button 
          variant=${have == 'Cereal' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'Cereal')} 
          class="resource"
        >
          Cereal
        </sl-button>
        <sl-button 
          variant=${have == 'Rock' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'Rock')} 
          class="resource"
        >
          Rock
        </sl-button>
      </div>
      <div class="dialog-column">
        <div class="dialog-row">Want x1:</div>
        <sl-button 
          variant=${want == 'Block' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'Block')} 
          class="resource"
        >
          Block
        </sl-button>
        <sl-button 
          variant=${want == 'Timber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'Timber')} 
          class="resource"
        >
          Timber
        </sl-button>
        <sl-button 
          variant=${want == 'Fiber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'Fiber')} 
          class="resource"
        >
          Fiber
        </sl-button>
        <sl-button 
          variant=${want == 'Cereal' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'Cereal')} 
          class="resource"
        >
          Cereal
        </sl-button>
        <sl-button 
          variant=${want == 'Rock' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'Rock')} 
          class="resource"
        >
          Rock
        </sl-button>
      </div>
      <sl-button slot="footer" variant="primary" @click=${() => trade(socket,key,have,want,setHave,setWant,setOpen)}>
        Trade
      </sl-button>
      <sl-button slot="footer" variant="neutral" @click=${() => setOpen(false)}>
        Close
      </sl-button>
    </sl-dialog>

    <style>
      .dialog-column {
        display: inline-block;
        padding-left: 20px;
        padding-right: 20px;
      }
      .dialog-row {
        text-align: left;
        font-weight: bold;
      }
      sl-button.resource {
        display: block;
        width: auto;
        margin: 5px 0 5px 0;
      }
    </style>
  `;
}

function toggleSetter(setter, type) {
  setter(prev => {
    if (prev == type) return '';
    else return type;
  });
}

function trade(socket, key, have, want, setHave, setWant, setOpen) {
  
  socket.send(JSON.stringify({
    action: 'Trade',
    player: key,
    target: [null,null,null,null,null],
    trade: [have, want]
  }));

  setHave('');
  setWant('');
  setOpen(false);
}

customElements.define("trade-dialog", component(TradeDialog));