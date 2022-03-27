import { html, component, useState } from 'haunted';
import {classMap} from 'lit-html/directives/class-map.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';

import './TradeDialog.js';

function GameControls({ 
  message,
  gamePhase,
  selectedRoads,
  setSelectedRoads,
  selectedNodes,
  setSelectedNodes,
  socket}) {

  const [errorMessage, setErrorMessage] = useState( '' );
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO: Add a third message type for when it is someone else's turn
  return html`
    <div id="controls">
      <!-- Message bar -->
      <div class="message-bar">
        ${html`
          <div
            class=${classMap({
              'error-message': errorMessage != '',
              'status-message': errorMessage == '' && message != ''
            })}
          />
            ${errorMessage == '' ? message : errorMessage}
          </div>
        `}
      </div>
      <!-- Action buttons -->
      <sl-button class="action-button" size="small" @click=${() => rollDice(socket, setErrorMessage)}>
        Roll Dice
      </sl-button>
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => build(socket, 
          gamePhase, 
          selectedRoads, 
          setSelectedRoads, 
          selectedNodes, 
          setSelectedNodes, 
          setErrorMessage)}
      >
        Build Selected
      </sl-button>
      <sl-button class="action-button" size="small" @click=${() => setDialogOpen(true)}>
        Trade
      </sl-button>
      <sl-button class="action-button" size="small" @click=${() => endturn(socket, setErrorMessage)}>
        End Turn
      </sl-button>
      <!-- Trade dialog -->
      <trade-dialog
        .open=${dialogOpen}
        .setOpen=${setDialogOpen}
        .socket=${socket}
        .setError=${setErrorMessage}
      >
      </trade-dialog>
    </div>

    <style>
      #controls {
        position: fixed;
        bottom: 10px;
        width: 95%;
        max-width: 800px;
      }
      .message-bar {
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .message-bar > div {
        font-size: 20px;
        font-weight: bolder;
        min-height: 27px;
      }
      .status-message {
        background-color: lightgreen;
      }
      .error-message {
        background-color: lightpink;
      }
      sl-button.action-button::part(base) {
        margin: 5px;
      }
      sl-button.action-button::part(label) {
        font-size: large;
        font-weight: bold;
      }
    </style>
  `;
}

function rollDice(socket, setErrorMessage) {
  socket.emit('player-actions', {
    'rollDice': {
      pid: socket.id
    }
  }, response => {
    setErrorMessage(response.status);
    setTimeout(msg => setErrorMessage(msg), 3000, '');
  });
}

function build(socket, phase, selectedRoads, setSelectedRoads, selectedNodes, setSelectedNodes, setErrorMessage) {
  let buildAction = phase == 'setup' ? 'setupVillagesAndRoads'
    : phase == 'play' ? 'buildStuff'
    : '';
  socket.emit('player-actions', {
    [buildAction]: {
      pid: socket.id,
      nodes: [...selectedNodes],
      roads: [...selectedRoads]
    }
  }, response => {
    setErrorMessage(response.status);
    setTimeout(msg => setErrorMessage(msg), 3000, '');
  });
  setSelectedRoads(new Set());
  setSelectedNodes(new Set());
}

function endturn(socket, setErrorMessage) {
  socket.emit('end-my-turn', {}, response => {
    setErrorMessage(response.status);
    setTimeout(msg => setErrorMessage(msg), 3000, '');
  });
}

customElements.define("game-controls", component(GameControls));