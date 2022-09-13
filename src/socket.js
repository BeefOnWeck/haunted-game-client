// import { io } from 'socket.io-client';

export default function bindToSocket(gameState, setGameState, setErrorMessage) {

  // 
  // let socket = io(process.env.APP_SERVER_ORIGIN, {
  //   transports: ['websocket']
  // });

  let socket = new WebSocket(process.env.APP_SERVER_ORIGIN);

  /**
   * 
   */
  socket.addEventListener('open', function(event) {

    // if (gameState.myName) {
    //   socket.emit('reconnect-user-name', gameState.myName, response => {
    //     console.log(response.status);
    //   });
    // }

    // setGameState(prevState => ({
    //   ...prevState,
    //   myId: this.id,
    //   isConnected: true
    // }));
  });

  socket.addEventListener('message', function(event){

    let message = JSON.parse(event.data);

    if (message.error) {

      console.log(message.error);
      setErrorMessage(message.error);
      setTimeout(msg => setErrorMessage(msg), 3000, '');

    } else if (message.state) {

      const data = message.state;
      console.log(data);

      const winningPlayer = data?.the_winner?.name;

      let stateMessage;
      if (data?.phase == 'End') {
        stateMessage = 'Game Over: Winner is ' + winningPlayer + '.';
      } else {
        stateMessage = '';
      }

      const activePlayerName = data?.active_player?.name;

      let centroids = [];
      let scorpion = {x: null, y: null};

      data.board.centroids.forEach((cent,idx) => {
        centroids.splice(idx,1,cent);
        if (idx == data.board.scorpion_index) {
          scorpion = {...cent.loc};
        }
      });

      let nodes = [];
      let villages = [];

      data.board.nodes.forEach((node,idx) => {
        // TODO: Only do this once on the first state message
        nodes.splice(idx,1,node.loc);
        const color = node.player_key ? data.colors[node.player_key] : null;
        villages.push({
          x: node.loc.x,
          y: node.loc.y,
          color: color, // No player --> null color --> village not visible
          opacity: color ? 1.0 : 0.0
        });
      });

      let hexagons = [];
      let numbers = [];

      data.board.hexagons.forEach((hex,idx) => {
        // SVG polygon defining a hexagon
        let poly = hex.vertices.reduce((acc, cv, ci) => {
          return ci<5 ? acc + `${cv.x},${cv.y}, ` : acc + `${cv.x},${cv.y}`;
        }, '');
        // TODO: Only do this once on first game status message
        hexagons.splice(idx,1,{
          poly: poly,
          resource: hex.resource
        });
        numbers.splice(idx,1,hex.number);
      });

      let lines = [];
      let roads = [];

      // Update the roads
      data.board.roads.forEach((road,idx) => {
        // Define SVG lines for all potential roads
        let node1 = data.board.nodes[road.inds[0]].loc;
        let node2 = data.board.nodes[road.inds[1]].loc;
        let path = `M ${node1.x} ${node1.y} L ${node2.x} ${node2.y}`;
        lines.splice(idx,1,path);
        // Define SVG for built roads
        const color = road.player_key ? data.colors[road.player_key] : 'black';
        roads.splice(idx,1,{
          path: path,
          color: color,
          opacity: color!='black' ? 1.0 : 0.0 // TODO: Consider `color ? 1.0 : 0.0`
        });
      });


      setGameState(prevState => ({
        ...prevState,
        hasJoined: true,
        isConnected: true,
        round: data.round,
        phase: data.phase,
        myId: data.key,
        stateMessage: stateMessage,
        rollResult: data.roll_result,
        activePlayerName: activePlayerName,
        playerResources: data.resources,
        gameBoard: {
          centroids: centroids,
          scorpion: scorpion,
          nodes: nodes,
          villages: villages,
          hexagons: hexagons,
          numbers: numbers,
          lines: lines,
          roads: roads,
        }
      }));
    }

  });

  /**
   * 
   */
  // socket.on('it-is-your-turn', (msg) => {

  //   let actionMessage = 'Actions you can take:';

  //   if (msg.includes('setupVillagesAndRoads')) {
  //     actionMessage = 'Select one village and one road and hit Build Selected';
  //   }
  //   if (msg.includes('rollDice')) {
  //     actionMessage = 'Roll the dice.';
  //   } 
  //   if (msg.includes('moveScorpion')) {
  //     actionMessage = 'Move the scorpion.';
  //   }
  //   if (msg.includes('buildStuff')) {
  //     actionMessage += ' Build,';
  //   }
  //   if (msg.includes('trade')) {
  //     actionMessage += ' Trade,';
  //   }
  //   if (msg.includes('endTurn')) {
  //     actionMessage += ' End Turn,';
  //   }

  //   // Change any trailing commas to a period.
  //   if (actionMessage.slice(-1) == ',') {
  //     actionMessage = actionMessage.slice(0,actionMessage.length-1) + '.';
  //   }

  //   setGameState(prevState => ({
  //     ...prevState,
  //     myTurn: true,
  //     stateMessage: actionMessage,
  //     possibleActions: msg
  //   }));
  // });

  // /**
  //  * 
  //  */
  // socket.on('game-state', (msg) => {

  //   let stateMessage;

  //   const winningPlayer = msg.players
  //       .filter(ply => ply.id == msg.theWinner)
  //       .map(ply => ply.name)[0];
    
  //   if (msg?.phase == 'end') {
  //     stateMessage = 'Game Over: Winner is ' + winningPlayer + '.';
  //   } else {
  //     stateMessage = '';
  //   }

  //   const activePlayerName = msg.players
  //     .filter(ply => ply.id == msg.activePlayer)
  //     .map(ply => ply.name)[0];

  //   let centroids = [];
  //   let scorpion;

  //   // Update the grid centroids and scorpion location
  //   // NOTE: Centroids typically do not change once the game starts
  //   msg.state.centroids.forEach((cent,idx) => {
  //     // TODO: Only do this once on the first state message
  //     centroids.splice(idx,1,cent);
  //     if (idx == msg.state.scorpionIndex) {
  //       scorpion = {...cent};
  //     }
  //   });

  //   let nodes = [];
  //   let villages = [];

  //   // Update the grid nodes
  //   // NOTE: Nodes typically do not change once the game starts
  //   msg.state.nodes.forEach((node,idx) => {
  //     // TODO: Only do this once on the first state message
  //     nodes.splice(idx,1,node);
  //     // Find the player who has a village on this node and get their color.
  //     const nodesPlayer = msg.players.filter(p => p.id === node.playerId)[0];
  //     const color = nodesPlayer ? nodesPlayer.color : null;
  //     villages.push({
  //       x: node.x,
  //       y: node.y,
  //       color: color, // No player --> null color --> village not visible
  //       opacity: color ? 1.0 : 0.0
  //     });
  //   });

  //   let hexagons = [];

  //   // Update the grid hexagons
  //   // NOTE: Hexagons typically do not change once the game starts
  //   msg.state.hexagons.forEach((hex,idx) => {
  //     // SVG polygon defining a hexagon
  //     let poly = hex.vertices.reduce((acc, cv, ci) => {
  //       return ci<5 ? acc + `${cv.x},${cv.y}, ` : acc + `${cv.x},${cv.y}`;
  //     }, '');
  //     // TODO: Only do this once on first game status message
  //     hexagons.splice(idx,1,{
  //       poly: poly,
  //       resource: hex.resource
  //     });
  //   });

  //   let numbers = [];

  //   // TODO: Not currently used; consider removing.
  //   msg.state.numbers.forEach((num,idx) => {
  //     numbers.splice(idx,1,num);
  //   });

  //   let lines = [];
  //   let roads = [];

  //   // Update the roads
  //   msg.state.roads.forEach((road,idx) => {
  //     // Define SVG lines for all potential roads
  //     let node1 = msg.state.nodes[road.inds[0]];
  //     let node2 = msg.state.nodes[road.inds[1]];
  //     let path = `M ${node1.x} ${node1.y} L ${node2.x} ${node2.y}`;
  //     lines.splice(idx,1,path);
  //     // Define SVG for built roads
  //     const roadsPlayer = msg.players.filter(p => p.id === road.playerId)[0];
  //     // TODO: Consider replacing with `const color = roadsPlayer?.color`
  //     const color = roadsPlayer ? roadsPlayer.color : 'black';
  //     roads.splice(idx,1,{
  //       path: path,
  //       color: color,
  //       opacity: color!='black' ? 1.0 : 0.0 // TODO: Consider `color ? 1.0 : 0.0`
  //     });
  //   });

  //   const longestRoadOwner = msg.players
  //     .filter(ply => ply.id == msg.longestRoad)
  //     .map(ply => ply.name)[0];

  //   const longestRoadColor = msg.players
  //     .filter(ply => ply.id == msg.longestRoad)
  //     .map(ply => ply.color)[0];

  //   const mostBugsOwner = msg.players
  //     .filter(ply => ply.id == msg.mostBugs)
  //     .map(ply => ply.name)[0];

  //   const mostBugsColor = msg.players
  //     .filter(ply => ply.id == msg.mostBugs)
  //     .map(ply => ply.color)[0];

  //   setGameState(prevState => ({
  //     ...prevState,
  //     myTurn: msg.activePlayer == gameState.myId, // 
  //     round: msg.round,
  //     phase: msg.phase,
  //     activePlayerName: activePlayerName, // 
  //     stateMessage: stateMessage, //
  //     possibleActions: msg.possibleActions, // TODO
  //     playerResources: msg.state.playerResources,
  //     rollResult: msg.state.rollResult, // 
  //     theWinner: winningPlayer, // 
  //     longestRoadOwner: longestRoadOwner, // TODO
  //     longestRoadColor: longestRoadColor ?? 'lightgray', // TODO
  //     mostBugsOwner: mostBugsOwner, // TODO
  //     mostBugsColor: mostBugsColor ?? 'lightgray', // TODO
  //     yourBugs: msg.state.bugs, // TODO
  //     gameBoard: {
  //       centroids: centroids,
  //       scorpion: scorpion,
  //       nodes: nodes,
  //       villages: villages,
  //       hexagons: hexagons,
  //       numbers: numbers,
  //       lines: lines,
  //       roads: roads,
  //     }
  //   }));
    
  // });

  //
  return socket;

}
