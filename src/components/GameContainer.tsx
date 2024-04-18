import { useState } from 'react';
import confetti from 'canvas-confetti'

import Table from './Table.tsx';
import Modal from './Modal.tsx';
import Toast from './Toast.tsx';

export interface Scores {
	[key: number]: number[];
}

export interface Players {
  [key: number]: string;
}

interface GameContainerProps {
  players: Players;
  storedScores: Scores | null;
  saveScores: (scores: Scores) => void;
}

const generateScores = (players: Players): Scores => {
  const scores: Scores = {};
  for (const [playerId] of Object.entries(players)) {
    scores[Number(playerId)] = [];
  }

  return scores;
}

export default function GameContainer({ players, storedScores, saveScores }: GameContainerProps) {
	const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
	const [scores, setScores] = useState<Scores>(storedScores ?? generateScores(players));

	const addScore = (playerId: number, score: number) => {
		const playerScores = scores[playerId];
		const lastScore = playerScores[playerScores.length - 1] || 0;
		const newScore = lastScore + score;

    setCurrentPlayer(null);

    if (newScore > 10000) {
      // Alert you did not win
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    const newScores = {
      ...scores,
      [playerId]: [...playerScores, newScore],
    }

    if (newScore === 10000) {
      setScores(newScores);
      saveScores(newScores);
      confetti();
      return;
    }

		setScores(newScores);
    saveScores(newScores);
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
			<Table players={players} scores={scores} displayModalForPlayer={displayModalForPlayer}/>
			<Modal showModal={showModal} onModalClose={onCloseModal} playerName={players[currentPlayer!]} />
      <Toast showToast={showToast} content="¡Te pasaste de 10.000!"/>
		</>
	);
}