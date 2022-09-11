import { html, component, useState } from 'haunted';
import bindToSocket from './socket.js';

import './components/GameLogin.js';
import './components/GameBoard.js';

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
    rollResult: [0,0],
    theWinner: null,
    longestRoadOwner: null,
    longestRoadColor: 'lightgray',
    mostBugsOwner: null,
    mostBugsColor: 'lightgray',
    yourBugs: null,
    gameBoard: {
      centroids: [],
      nodes: [],
      hexagons: [],
      numbers: [],
      roads: [],
      lines: [],
      villages: [],
      scorpion: {x: null, y: null}
    }
  });

  const [errorMessage, setErrorMessage] = useState( '' );

  if (socket == null) {
    socket = bindToSocket(gameState, setGameState, setErrorMessage);
  }
  
  return gameState.hasJoined == false ? 
    html`
      <game-login
        .socket=${socket}
        @joined=${event => joinedListener(event, gameState, setGameState)}
      ></game-login>
    ` : 
    html`
      <game-board
        .gameState=${gameState}
        .errorMessage=${errorMessage}
        .socket=${socket}
      ></game-board>
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
