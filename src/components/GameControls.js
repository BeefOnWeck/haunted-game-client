import { html, component, useState } from 'haunted';
import {classMap} from 'lit-html/directives/class-map.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';

import './TradeDialog.js';

function GameControls({ 
  message,
  errorMessage,
  gamePhase,
  selectedRoads,
  setSelectedRoads,
  selectedNodes,
  setSelectedNodes,
  key,
  socket}) {

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
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => rollDice(socket, key)}
      >
        Roll Dice
      </sl-button>
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => build(socket, 
          key,
          gamePhase, 
          selectedRoads, 
          setSelectedRoads, 
          selectedNodes, 
          setSelectedNodes)}
      >
        Build Selected
      </sl-button>
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => setDialogOpen(true)}
      >
        Trade
      </sl-button>
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => buyBug(socket, key)}
      >
        Buy Bug
      </sl-button>
      <sl-button 
        class="action-button" 
        size="small" 
        @click=${() => endturn(socket, key)}
      >
        End Turn
      </sl-button>
      <!-- Trade dialog -->
      <trade-dialog
        .open=${dialogOpen}
        .setOpen=${setDialogOpen}
        .socket=${socket}
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

function rollDice(socket, key) {
  socket.send(JSON.stringify({
    action: 'RollDice',
    player: key,
    target: 'None',
    trade: 'None'
  }));
}

function build(socket, key, phase, selectedRoads, setSelectedRoads, 
  selectedNodes, setSelectedNodes) {
  let buildAction = phase == 'Setup' ? 'PlaceVillageAndRoad'
    : phase == 'Play' ? 'BuildStuff'
    : '';
  let target = [
    [...selectedRoads].map(r => (['Road',r])),
    [...selectedNodes].map(n => (['Node',n]))
  ].flat();
  while (target.length < 5) target.push(null);
  let command = {
    action: buildAction,
    player: key,
    target,
    trade: null
  };
  socket.send(JSON.stringify(command));
  setSelectedRoads(new Set());
  setSelectedNodes(new Set());
}

function buyBug(socket) {
  socket.emit('player-actions', {
    'buyBug': {
      pid: socket.id
    }
  }, response => {
    setErrorMessage(response.status);
    setTimeout(msg => setErrorMessage(msg), 3000, '');
  });
}

function endturn(socket) {
  socket.emit('end-my-turn', {}, response => {
    setErrorMessage(response.status);
    setTimeout(msg => setErrorMessage(msg), 3000, '');
  });
}

customElements.define("game-controls", component(GameControls));