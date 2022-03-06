import { html, component, useState } from 'haunted';
import {classMap} from 'lit-html/directives/class-map.js';

function GameControls({ 
  message,
  action,
  playerResources,
  rollResult,
  gamePhase,
  selectedRoads,
  setSelectedRoads,
  selectedNodes,
  setSelectedNodes}) {

  const [errorMessage, setErrorMessage] = useState( '' );

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
    </style>
  `;
}

customElements.define("game-controls", component(GameControls));