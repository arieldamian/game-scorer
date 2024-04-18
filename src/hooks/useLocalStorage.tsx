import { useEffect, useState } from "react";
import type { Players, Scores } from "../components/GameContainer";

const GAME_KEY = 'game';
const PLAYERS_KEY = 'players';

export default function useLocalStorage(): [Players, Scores | null, (players: Players) => void, (scores: Scores) => void, boolean] {
    const [players, setPlayers] = useState<Players>({});
    const [scores, setScores] = useState<Scores | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const savePlayers = (players: Players) => {
      localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
      setPlayers(players);
    };
  
    const saveScores = (scores: Scores) => {
      localStorage.setItem(GAME_KEY, JSON.stringify(scores));
      setScores(scores);
    };
  
    const retrievePlayers = () => {
      const currentPlayersString = localStorage.getItem(PLAYERS_KEY);

      if (currentPlayersString) {
        setPlayers(JSON.parse(currentPlayersString));
      }
    };
  
    const retrieveScores = () => {
      const savedScoresString = localStorage.getItem(GAME_KEY);
  
      if (savedScoresString) {
        setScores(JSON.parse(savedScoresString));
      }
    };
  
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
      isLoading,
    ];
  };