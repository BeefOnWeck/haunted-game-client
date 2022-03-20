import { html, component } from 'haunted';

import './DiceRoll.js';
import './ResourceBadges.js'

function StatusBar({ message, resources, roll, phase, activePlayer }) {

  return html`
    <dice-roll 
      .roll1=${roll[0]}
      .roll2=${roll[1]}
    ></dice-roll>
    <resource-badges
      .block=${resources['block']}
      .timber=${resources['timber']}
      .fiber=${resources['fiber']}
      .cereal=${resources['cereal']}
      .rock=${resources['rock']}
    ></resource-badges>

    <style>
      dice-roll {
        margin-right: 25px;
      }
    </style>
  `;
}

customElements.define("status-bar", component(StatusBar));