import { html, component } from 'haunted';

function StatusBar({ message, resources, roll, phase, activePlayer }) {

  return html`
    <div id="resource-list">
      ${Object.entries(resources).map(([name,value]) => {
        return html`
          <div class="resource ${name}">
            ${name}: ${value}
          </div>
        `;
      })}
    </div>
    <div class="status-fields">
      <div id="dice-roll">
        Dice: ${roll}
      </div>
      <div id="active-player">
        Turn: ${activePlayer}
      </div>
    </div>

    <style>
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
      .status-fields {
        background: #cccfea;
        margin-top: 10px;
        border: thin;
        border-style: solid;
      }
      .status-fields > div {
        font-size: 20px;
        font-weight: bolder;
        display: inline-block;
      }
      #dice-roll {
        margin-right: 20px;
      }
      #active-player {
        margin-left: 20px;
      }
    </style>
  `;
}

customElements.define("status-bar", component(StatusBar));