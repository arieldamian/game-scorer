import { useState } from 'react';
import confetti from 'canvas-confetti'

import Table from './Table.tsx';
import Modal from './Modal.tsx';

export interface PlayersMap {
	[key: number]: number[];
}

export interface PlayerNamesInterface {
  [key: number]: string;
}

const playersNames: PlayerNamesInterface = {
  1: 'Tota',
  2: 'Poncho',
  3: 'Dudi',
  4: 'Agus',
  5: 'Hugo',
  6: 'Marita',
  7: 'Nilda',
  8: 'Raul',
};

const generatePlayersMap = (players: PlayerNamesInterface): PlayersMap => {
  const playersMap: PlayersMap = {};

  for (const [playerId] of Object.entries(players)) {
    playersMap[Number(playerId)] = [];
  }

  return playersMap;
}

export default function GameContainer() {
	const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
	const [playersMap, setPlayersMap] = useState<PlayersMap>(generatePlayersMap(playersNames));

	const addScore = (playerId: number, score: number) => {
		// Add score should take the last value of the array and add the score to it
		// beware that the array could be empty
		// If the array is empty, add the score to the array
		const playerScores = playersMap[playerId];
		const lastScore = playerScores[playerScores.length - 1] || 0;
		const newScore = lastScore + score;

    if (newScore > 10000) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    if (newScore === 10000) {
      // If the score is 10000, add it to the array and finish the game
      const newPlayersMap = {
        ...playersMap,
        [playerId]: [...playerScores, newScore],
      }

      setPlayersMap(newPlayersMap);
      setCurrentPlayer(null);
      confetti();
      return;
    }

		const newPlayersMap = {
			...playersMap,
			[playerId]: [...playerScores, newScore],
		}

		setPlayersMap(newPlayersMap);
    setCurrentPlayer(null);
	}

	const displayModalForPlayer = (playerId: number) => {
		setCurrentPlayer(playerId);
		setShowModal(true);
	}

	const onCloseModal = (value: number) => {
		setShowModal(false);

		if (currentPlayer && value) {
			addScore(currentPlayer, value);
		}
	}

	return (
		<>
      <h1 className='my-4'>10.000 Scorer</h1>
			<Table playersNames={playersNames} playersMap={playersMap} displayModalForPlayer={displayModalForPlayer}/>
			<Modal showModal={showModal} onModalClose={onCloseModal} playerName={playersNames[currentPlayer!]} />
      <div
        id="toast-warning"
        className={`fixed bottom-10
          flex items-center
          w-full max-w-xs
          p-4
          text-gray-500
          bg-white
          rounded-lg
          shadow
          dark:text-gray-400
          dark:bg-gray-800
          ${showToast ? 'opacity-100' : 'opacity-0'}
          transition-opacity ease-in-out delay-150 duration-500`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
        </div>
        <div className="ms-3 text-base font-normal">¡Te pasaste de 10.000!</div>
      </div>
		</>
	);
}