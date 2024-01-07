import { html, component, useState } from 'haunted';

import './DiceRoll.js';
import './ResourceBadges.js';
import './MostBugs.js';
import './LongestRoad.js';
import './HelpDialog.js';

function StatusBar({ 
  myName, 
  resources, 
  roll, 
  activePlayer, 
  theWinner, 
  yourBugs, 
  longestRoadOwner, 
  longestRoadColor, 
  mostBugsOwner, 
  mostBugsColor }) {

  const [dialogOpen, setDialogOpen] = useState(false);

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
    <most-bugs
      .mostBugsColor=${mostBugsColor}
      .yourBugs=${yourBugs}
    ></most-bugs>
    <longest-road
      .longestRoadColor=${longestRoadColor}
    ></longest-road>
    <help-dialog
      .open=${dialogOpen}
      .setOpen=${setDialogOpen}
      .myName=${myName}
      .resources=${resources}
      .activePlayer=${activePlayer}
      .theWinner=${theWinner}
      .longestRoadOwner=${longestRoadColor}
      .mostBugsOwner=${mostBugsColor}
    ></help-dialog>

    <style>
      dice-roll {
        margin-right: 2vw;
      }
      help-dialog {
        margin-left: 3vw;
      }
      @media screen and (max-width: 400px) {
        help-dialog {
          position: absolute;
          top: 19vw;
          right: 7vw;
        }
      }
    </style>
  `;
}

customElements.define("status-bar", component(StatusBar));