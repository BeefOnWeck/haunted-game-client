import { html, component } from 'haunted';

import './DiceRoll.js';

function StatusBar({ message, resources, roll, phase, activePlayer }) {

  return html`
    <dice-roll>
      .roll=${roll}
    </dice-roll>
    <div id="resource-list">
      ${Object.entries(resources).map(([name,value]) => {
        return html`
          <div class="resource ${name}">
            ${name}: ${value}
          </div>
        `;
      })}
    </div>

    <style>
      #resource-list {
        display: inline-block;
      }
      .resource {
        display: inline-block;
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

customElements.define("status-bar", component(StatusBar));