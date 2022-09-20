
export default function bindToSocket(gameState, setGameState, setErrorMessage) {

  let socket = new WebSocket(process.env.APP_SERVER_ORIGIN);

  /**
   * 
   */
  socket.addEventListener('open', function(event) {
    console.log('Websocket connection established.');
  });

  /**
   * 
   */
  socket.addEventListener('message', function(event){

    let message = JSON.parse(event.data);

    if (message.error) {

      console.log(message.error);
      setErrorMessage(message.error);
      setTimeout(msg => setErrorMessage(msg), 3000, '');

    } else if (message.state) {

      const data = message.state;
      
      window.localStorage.setItem('rgs-user-key', data?.key);

      let actionMessage = 'Actions you can take:';

      if (data?.allowed_actions?.includes('PlaceVillageAndRoad')) {
        actionMessage = 'Select one village and one road and hit Build Selected';
      }
      if (data?.allowed_actions?.includes('RollDice')) {
        actionMessage = 'Roll the dice.';
      } 
      if (data?.allowed_actions?.includes('MoveScorpion')) {
        actionMessage = 'Move the scorpion.';
      }
      if (data?.allowed_actions?.includes('BuildStuff')) {
        actionMessage += ' Build,';
      }
      if (data?.allowed_actions?.includes('Trade')) {
        actionMessage += ' Trade,';
      }
      if (data?.allowed_actions?.includes('EndTurn')) {
        actionMessage += ' End Turn,';
      }

      // Change any trailing commas to a period.
      if (actionMessage?.slice(-1) == ',') {
        actionMessage = actionMessage.slice(0,actionMessage.length-1) + '.';
      }

      const activePlayerName = data?.active_player?.name;
      const winningPlayer = data?.the_winner?.name;
      const myTurn = data?.active_player?.key == data?.key;

      let stateMessage;
      if (data?.phase == 'End') {
        stateMessage = 'Game Over: Winner is ' + winningPlayer + '.';
      } else if (data?.phase == 'Boot') {
        stateMessage = 'Waiting for game to start...';
      } else if (myTurn) {
        stateMessage = actionMessage;
      } else {
        stateMessage = '';
      }

      let centroids = [];
      let scorpion = {x: -1000, y: -1000};

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


      setGameState(prevState => {

        clearTimeout(prevState.timer);
        const timer = setTimeout(() => {
          console.log('Firing timeout')
          setGameState(prevState => ({
            ...prevState,
            hasJoined: false,
            isConnected: false
          }));
        }, 10000);
        
        return {
          ...prevState,
          timer: timer,
          hasJoined: true,
          isConnected: true, // TODO: This is not used; consider removing
          round: data.round,
          phase: data.phase,
          myId: data.key,
          stateMessage: stateMessage,
          rollResult: data.roll_result,
          activePlayerName: activePlayerName,
          myTurn,
          possibleActions: data?.allowed_actions,
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
        };
      });
    }

  });

  return socket;

}
