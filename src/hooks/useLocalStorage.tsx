import { useEffect, useState } from "react";
import type { Players, Scores } from "../components/GameContainer";

const SCORES_KEY = 'scores';
const PLAYERS_KEY = 'players';

export default function useLocalStorage(): [Players, Scores | null, (players: Players) => void, (scores: Scores) => void, () => void, boolean] {
    const [players, setPlayers] = useState<Players>({});
    const [scores, setScores] = useState<Scores | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const savePlayers = (players: Players) => {
      localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
      setPlayers(players);
    };
  
    const saveScores = (scores: Scores) => {
      localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
      setScores(scores);
    };
  
    const retrievePlayers = () => {
      const currentPlayersString = localStorage.getItem(PLAYERS_KEY);

      if (currentPlayersString) {
        setPlayers(JSON.parse(currentPlayersString));
      }
    };
  
    const retrieveScores = () => {
      const savedScoresString = localStorage.getItem(SCORES_KEY);
  
      if (savedScoresString) {
        setScores(JSON.parse(savedScoresString));
      }
    };

    const deleteEverything = () => {
      localStorage.removeItem(PLAYERS_KEY);
      localStorage.removeItem(SCORES_KEY);
      setPlayers({});
      setScores(null);
    }
  
    useEffect(() => {
      retrievePlayers();
      retrieveScores();
      setIsLoading(false);
  
      return () => {};
    }, []);
  
    return [
      players,
      scores,
      savePlayers,
      saveScores,
      deleteEverything,
      isLoading,
    ];
  };