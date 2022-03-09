import { html, component, useState } from 'haunted';
import {classMap} from 'lit-html/directives/class-map.js';

import './TradeDialog.js';

function GameControls({ 
  message,
  action,
  playerResources,
  rollResult,
  gamePhase,
  selectedRoads,
  setSelectedRoads,
  selectedNodes,
  setSelectedNodes,
  socket}) {

  const [errorMessage, setErrorMessage] = useState( '' );
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <button class="action-button" @click=${() => rollDice(socket, setErrorMessage)}>
        Roll Dice
      </button>
      <button 
        class="action-button" 
        @click=${() => build(socket, 
          gamePhase, 
          selectedRoads, 
          setSelectedRoads, 
          selectedNodes, 
          setSelectedNodes, 
          setErrorMessage)}
      >
        Build Selected
      </button>
      <button class="action-button" @click=${() => setDialogOpen(true)}>
        Trade
      </button>
      <button class="action-button" @click=${() => endturn(socket, setErrorMessage)}>
        End Turn
      </button>
      <!-- Trade dialog -->
      <trade-dialog
        .open=${dialogOpen}
        .setOpen=${setDialogOpen}
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
        border: thin;
        border-style: solid;
      }
      .status-message {
        background-color: lightgreen;
      }
      .error-message {
        background-color: lightpink;
      }
      .action-button {
        display: inline-block;
        margin: 5px;
        font-size: 20px;
      }
      .action-button > input{
        font-size: larger;
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