import { useState } from 'react';
import Table from './Table.tsx';
import Modal from './Modal.tsx';

export interface PlayersMap {
	[key: number]: number[];
}

export interface PlayerNamesInterface {
  [key: number]: string;
}

const playersNames: PlayerNamesInterface = {
  1: 'Player 1',
  2: 'Player 2',
  3: 'Player 3',
  4: 'Player 4',
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
	const [playersMap, setPlayersMap] = useState<PlayersMap>(generatePlayersMap(playersNames));

	const addScore = (playerId: number, score: number) => {
		// Add score should take the last value of the array and add the score to it
		// beware that the array could be empty
		// If the array is empty, add the score to the array
		const playerScores = playersMap[playerId];
		const lastScore = playerScores[playerScores.length - 1] || 0;
		const newScore = lastScore + score;

		const newPlayersMap = {
			...playersMap,
			[playerId]: [...playerScores, newScore],
		}

		setPlayersMap(newPlayersMap);
    	setCurrentPlayer(null);
	}

	const displayModalForPlayer = (playerId: number) => {
		setShowModal(true);
		setCurrentPlayer(playerId);
	}

	const onCloseModal = (value: number) => {
		setShowModal(false);

		if (currentPlayer && value) {
			addScore(currentPlayer, value);
		}
	}

	return (
		<>
      <h1>10.000 Scorer</h1>
			<Table playersNames={playersNames} playersMap={playersMap} displayModalForPlayer={displayModalForPlayer}/>
			<Modal showModal={showModal} onModalClose={onCloseModal} />
		</>
	);
}