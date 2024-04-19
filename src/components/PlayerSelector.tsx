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

  return <div className="w-full mt-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center p-10">
      <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">10.000</h1>
      <div className="w-40 my-2 border-b border-gray-300 dark:border-gray-600" />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Jugadores</h5>
      <div className="flex flex-col mt-4 md:mt-6 w-full">
            {players.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
                <h3 className="text-base font-light text-gray-900 dark:text-white">
                  {player}
                </h3>
                <button onClick={() => handleDeletePlayer(index)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                </button>
              </div>
            ))}
      </div>
      <form className="flex flex-col items-center max-w-sm mx-auto mt-10" onSubmit={handleAddPlayer}>   
        <div className="flex">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
              </svg>
            </div>
            <input autoFocus
              type="text"
              placeholder="Nombre"
              onChange={handleChange}
              value={currentPlayer} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        <button
          onClick={handleStartGame}
          className="text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium py-2 px-3 mt-4 w-full"
        >Comenzar juego</button>
      </form>
    </div>
  </div>;
}