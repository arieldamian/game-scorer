import { useState } from "react";
import type { Players } from "./GameContainer";

interface PlayerSelectorProps {
  savePlayers: (players: Players) => void;
}

export default function PlayerSelector({ savePlayers }: PlayerSelectorProps) {
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer(e.target.value);
  }

  const handleAddPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlayers([...players, currentPlayer]);
    setCurrentPlayer('');
  }

  const handleDeletePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  }

  const handleStartGame = () => {
    const playersObj: Players = players.reduce((acc, player, index) => {
      acc[index + 1] = player;
      return acc;
    }, {} as Players);

    savePlayers(playersObj);
  }

  return (<>
    {players.map((player, index) => (
      <div key={index} className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {player}
        </h3>
        <button onClick={() => handleDeletePlayer(index)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    ))}
    <form onSubmit={handleAddPlayer}>
      <div className="flex">
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={currentPlayer}
          className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-s-0 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
        </span>
      </div>
    </form>
    <button onClick={handleStartGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Comenzar juego</button>
  </>);
}