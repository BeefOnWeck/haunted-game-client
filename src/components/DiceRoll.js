import { html, component } from 'haunted';
import { svg } from 'lit-html';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';

function DiceRoll({ roll }) {

  return html`
    <sl-animation name="rollIn" easing="linear" duration="2000" iterations="1" play>
      <div class="dice-roll">
        <svg viewBox="0 0 100 100">${svg`
          <rect width="100" height="100" rx="15" />
        `}</svg>
      </div>
    </sl-animation>
    <sl-animation name="rollIn" easing="linear" duration="2000" iterations="1" play>
      <div class="dice-roll">
        <svg viewBox="0 0 100 100">${svg`
          <rect width="100" height="100" rx="15" />
        `}</svg>
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
    </style>
  `;
}

customElements.define("dice-roll", component(DiceRoll));