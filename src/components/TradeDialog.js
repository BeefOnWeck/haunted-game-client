import { html, component, useState } from 'haunted';
import {classMap} from 'lit-html/directives/class-map.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('.');

function TradeDialog({open,setOpen,socket,setError}){

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
          variant=${have == 'block' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'block')} 
          class="resource"
        >
          Block
        </sl-button>
        <sl-button 
          variant=${have == 'timber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'timber')} 
          class="resource"
        >
          Timber
        </sl-button>
        <sl-button 
          variant=${have == 'fiber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'fiber')} 
          class="resource"
        >
          Fiber
        </sl-button>
        <sl-button 
          variant=${have == 'cereal' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'cereal')} 
          class="resource"
        >
          Cereal
        </sl-button>
        <sl-button 
          variant=${have == 'rock' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setHave,'rock')} 
          class="resource"
        >
          Rock
        </sl-button>
      </div>
      <div class="dialog-column">
        <div class="dialog-row">Want x1:</div>
        <sl-button 
          variant=${want == 'block' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'block')} 
          class="resource"
        >
          Block
        </sl-button>
        <sl-button 
          variant=${want == 'timber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'timber')} 
          class="resource"
        >
          Timber
        </sl-button>
        <sl-button 
          variant=${want == 'fiber' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'fiber')} 
          class="resource"
        >
          Fiber
        </sl-button>
        <sl-button 
          variant=${want == 'cereal' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'cereal')} 
          class="resource"
        >
          Cereal
        </sl-button>
        <sl-button 
          variant=${want == 'rock' ? 'primary' : 'default'}
          @click=${() => toggleSetter(setWant,'rock')} 
          class="resource"
        >
          Rock
        </sl-button>
      </div>
      <sl-button slot="footer" variant="primary" @click=${() => trade(socket,have,want,setHave,setWant,setOpen,setError)}>
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

function trade(socket, have, want, setHave, setWant, setOpen, setError) {
  socket.emit('player-actions', {
    trade: {
      pid: socket.id,
      have: have,
      want: want
    }
  }, response => {
    setError(response.status);
    setTimeout(msg => setError(msg), 3000, '');
  });
  setHave('');
  setWant('');
  setOpen(false);
}

customElements.define("trade-dialog", component(TradeDialog));