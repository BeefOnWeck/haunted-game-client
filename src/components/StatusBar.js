import { html, component } from 'haunted';

function StatusBar({ message, resources, roll, phase, activePlayer }) {

  return html`
    <div id="resource-list">
      ${Object.entries(resources).map((value,name) => {
        return html`
          <div class="resource ${name}">
            ${name}: ${value}
          </div>
        `;
      })}
    </div>
    <!-- <div class="status-fields">
      <div id="dice-roll">
        Dice: {{rollResult}}
      </div>
      <div id="active-player">
        Turn: {{activePlayerName}}
      </div>
    </div> -->
  `;
}

customElements.define("status-bar", component(StatusBar));