import { useState } from 'react';
import Table from '../Table/Table.tsx';
import Modal from '../Modal.tsx';

export interface PlayersMap {
	[key: number]: number[];
}

export default function GameContainer() {
	const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
	const playerId = 1;
	const playerId2 = 2;
	const playerId3 = 3;
	const [playersMap, setPlayersMap] = useState<PlayersMap>({
			[playerId]: [],
			[playerId2]: [],
			[playerId3]: [],
	});

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
			<Table playersMap={playersMap} displayModalForPlayer={displayModalForPlayer}/>
			<Modal showModal={showModal} onModalClose={onCloseModal} />
			{/* <dialog ref={modalRef}>
				<button autoFocus onClick={() => modalRef?.current!.close()}>Close</button>
				<p>This modal dialog has a groovy backdrop!</p>
			</dialog>
			<button onClick={() => modalRef?.current!.showModal()}>Show the dialog</button> */}
		</>
	);
}