import GameContainer, { type Players, type Scores } from "./GameContainer";
import PlayerSelector from "./PlayerSelector";
import useLocalStorage from "../hooks/useLocalStorage";

export default function GameOrPlayerSelector() {
  const [players, scores, savePlayers, saveScores, isLoading] = useLocalStorage();
  
  const hasPlayers = Object.keys(players).length > 0;
  return (<>
    { isLoading ? <div>LOADING</div> : hasPlayers ?
        <GameContainer players={players} storedScores={scores} saveScores={saveScores} /> : <PlayerSelector savePlayers={savePlayers} />}
  </>);
}