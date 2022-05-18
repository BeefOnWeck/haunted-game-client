import { html, component, useState, useEffect } from 'haunted';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';

function ResourceBadges({ block, timber, fiber, cereal, rock }) {

  // For toggling the resource badge bouncing
  const [blockBounce, setBlockBounce] = useState(false);
  const [timberBounce, setTimberBounce] = useState(false);
  const [fiberBounce, setFiberBounce] = useState(false);
  const [cerealBounce, setCerealBounce] = useState(false);
  const [rockBounce, setRockBounce] = useState(false);

  // Need to delay state change till after bouncing starts
  const [delayedBlock, setDelayedBlock] = useState(null);
  const [delayedTimber, setDelayedTimber] = useState(null);
  const [delayedFiber, setDelayedFiber] = useState(null);
  const [delayedCereal, setDelayedCereal] = useState(null);
  const [delayedRock, setDelayedRock] = useState(null);

  // Stagger the bouncing
  useEffect(() => {
    setTimeout(() => {
      setBlockBounce(true);
      setTimeout(() => setDelayedBlock(block), 535);
    }, 1000);
  },[block]);

  useEffect(() => {
    setTimeout(() => {
      setTimberBounce(true);
      setTimeout(() => setDelayedTimber(timber), 535);
    }, 1200);
  },[timber]);

  useEffect(() => {
    setTimeout(() => {
      setFiberBounce(true);
      setTimeout(() => setDelayedFiber(fiber), 535);
    }, 1400);
  },[fiber]);

  useEffect(() => {
    setTimeout(() => {
      setCerealBounce(true);
      setTimeout(() => setDelayedCereal(cereal), 535);
    }, 1600);
  },[cereal]);

  useEffect(() => {
    setTimeout(() => {
      setRockBounce(true);
      setTimeout(() => setDelayedRock(rock), 535);
    }, 1800);
  },[rock]);

  return html`
    <div id="resource-list">
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${blockBounce} @sl-finish=${() => setBlockBounce(false)}>
        <div class="resource block">${delayedBlock}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${timberBounce} @sl-finish=${() => setTimberBounce(false)}>
        <div class="resource timber">${delayedTimber}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${fiberBounce} @sl-finish=${() => setFiberBounce(false)}>
        <div class="resource fiber">${delayedFiber}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${cerealBounce} @sl-finish=${() => setCerealBounce(false)}>
        <div class="resource cereal">${delayedCereal}</div>
      </sl-animation>
      <sl-animation name="bounce" easing="linear" duration="1000" iterations="1" ?play=${rockBounce} @sl-finish=${() => setRockBounce(false)}>
        <div class="resource rock">${delayedRock}</div>
      </sl-animation>
    </div>

    <style>
      #resource-list {
        display: inline-block;
        vertical-align: middle;
      }
      .resource {
        display: inline-block;
        margin: 0.25vw;
        padding: 5px 10px 5px 10px;
        border: black;
        font-weight: bolder;
        border-radius: 5px;
        font-size: 3vw;
      }
      @media screen and (min-width: 800px) {
        .resource {
          font-size: 24px;
        }
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