import { html, component } from 'haunted';
import { svg } from 'lit-html';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';

function DiceRoll({ roll }) {

  return html`
    <sl-animation name="rollIn" easing="linear" duration="1000" iterations="1" play>
      <div class="dice-roll">
        <svg id="die1" viewBox="0 0 100 100">
          ${diceSvg(roll)}
        </svg>
      </div>
    </sl-animation>
    <sl-animation name="rollIn" easing="linear" duration="1000" iterations="1" play>
      <div class="dice-roll">
        <svg id="die2" viewBox="0 0 100 100">
          ${diceSvg(roll)}
        </svg>
      </div>
    </sl-animation>

    <style>
      div.dice-roll {
        display: inline-block;
        vertical-align: bottom;
        margin-right: 5px;
        width: 5%;
      }
      div.dice-roll > svg {
        vertical-align: bottom;
      }
      div.dice-roll > svg > rect {
        fill: whitesmoke;
        stroke: black;
      }
    </style>
  `;
}

function diceSvg(roll) {

  switch(roll) {
    case 1:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="50" cy="50" r="8" />
      `;
    case 2:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="75" cy="75" r="8" />
      `;
    case 3:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="50" cy="50" r="8" />
        <circle cx="75" cy="75" r="8" />
      `;
    case 4:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="25" cy="75" r="8" />
        <circle cx="75" cy="25" r="8" />
        <circle cx="75" cy="75" r="8" />
      `;
    case 5:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="25" cy="75" r="8" />
        <circle cx="50" cy="50" r="8" />
        <circle cx="75" cy="25" r="8" />
        <circle cx="75" cy="75" r="8" />
      `;
    case 6:
      return svg`
        <rect width="100" height="100" rx="15" />
        <circle cx="25" cy="25" r="8" />
        <circle cx="25" cy="50" r="8" />
        <circle cx="25" cy="75" r="8" />
        <circle cx="75" cy="25" r="8" />
        <circle cx="75" cy="50" r="8" />
        <circle cx="75" cy="75" r="8" />
      `;
    default:
      return svg`
        <rect width="100" height="100" rx="15" />
      `;
  }
}

customElements.define("dice-roll", component(DiceRoll));