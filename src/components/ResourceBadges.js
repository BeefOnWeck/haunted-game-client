import { html, component, useState, useEffect } from 'haunted';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';

function ResourceBadges({ block, timber, fiber, cereal, rock }) {

  const [blockBounce, setBlockBounce] = useState(false);
  const [timberBounce, setTimberBounce] = useState(false);
  const [fiberBounce, setFiberBounce] = useState(false);
  const [cerealBounce, setCerealBounce] = useState(false);
  const [rockBounce, setRockBounce] = useState(false);

  useEffect(() => {
    setTimeout(() => setBlockBounce(true), 1000);
  },[block]);

  useEffect(() => {
    setTimeout(() => setTimberBounce(true), 1150);
  },[timber]);

  useEffect(() => {
    setTimeout(() => setFiberBounce(true), 1300);
  },[fiber]);

  useEffect(() => {
    setTimeout(() => setCerealBounce(true), 1450);
  },[cereal]);

  useEffect(() => {
    setTimeout(() => setRockBounce(true), 1600);
  },[rock]);

  return html`
    <div id="resource-list">
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${blockBounce} @sl-finish=${() => setBlockBounce(false)}>
        <div class="resource block">${block}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${timberBounce} @sl-finish=${() => setTimberBounce(false)}>
        <div class="resource timber">${timber}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${fiberBounce} @sl-finish=${() => setFiberBounce(false)}>
        <div class="resource fiber">${fiber}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${cerealBounce} @sl-finish=${() => setCerealBounce(false)}>
        <div class="resource cereal">${cereal}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${rockBounce} @sl-finish=${() => setRockBounce(false)}>
        <div class="resource rock">${rock}</div>
      </sl-animation>
    </div>

    <style>
      #resource-list {
        display: inline-block;
      }
      .resource {
        display: inline-block;
        margin: 3px;
        padding: 5px 10px 5px 10px;
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

customElements.define("resource-badges", component(ResourceBadges));