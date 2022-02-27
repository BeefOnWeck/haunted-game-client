import { html, component, useState } from 'haunted';
import bindToSocket from './socket.js';

import './components/GameLogin.js';
import './components/StatusBar.js';

let socket = null;

function App() {

  const [gameState, setGameState] = useState({
    isConnected: false,
    myId: null,
    myName: null,
    hasJoined: false,
    myTurn: false,
    round: 1,
    phase: 'boot',
    activePlayerName: '',
    possibleActions: [],
    stateMessage: 'Waiting for game to start...',
    playerResources: {},
    rollResult: 0,
    gameBoard: {
      centroids: [],
      nodes: [],
      hexagons: [],
      numbers: [],
      roads: [],
      lines: [],
      villages: [],
      brigand: {}
    }
  });

  if (socket == null) {
    socket = bindToSocket(gameState, setGameState);
  }
  
  return html`
    <game-login 
      .socket=${socket}
      @joined=${event => joinedListener(event, gameState, setGameState)}
    ></game-login>
    <status-bar
      .message=${gameState.stateMessage}
      .resources=${gameState.playerResources}
      .roll=${gameState.rollResult}
      .phase=${gameState.phase}
      .activePlayer=${gameState.activePlayerName}
    ></status-bar>

    ${JSON.stringify(gameState)}

    <style>
      fieldset {
        border: none;
      }

      legend {
        padding: 0;
        margin-bottom: 0.5rem;
      }
    </style>
  `;
}

// TODO: Move this to another file (listeners.js?)
function joinedListener(ev, gameState, setGameState) {
  if (ev.detail.status == 'You have been added.' || ev.detail.status == 'You have been reconnected.') {
    setGameState(prevState => ({
      ...prevState,
      myName: ev.detail.name,
      hasJoined: true
    }));
    window.localStorage.setItem('sgc-name', ev.detail.name);
  }
}

customElements.define("my-app", component(App));
