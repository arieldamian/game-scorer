import { useState } from 'react';
import confetti from 'canvas-confetti'

import Table from './Table.tsx';
import Modal from './Modal.tsx';
import Toast from './Toast.tsx';

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
      <Toast showToast={showToast} content="¡Te pasaste de 10.000!"/>
		</>
	);
}