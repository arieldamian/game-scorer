import react from 'react';
import { useState } from 'react';

interface PlayersMap {
    [key: number]: number[];
}

export default function Table() {
    const playerId = 1;
    const playerId2 = 2;
    const playerId3 = 3;
    const [playersMap, setPlayersMap] = useState<PlayersMap>({
        [playerId]: [],
        [playerId2]: [],
        [playerId3]: []
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
            [playerId]: [...playerScores, newScore]
        }

        setPlayersMap(newPlayersMap);
    }

    const calculateLabel = (player: number, index: number): string => {
        // If player exists and has a score at the given index, return the score
        // If position is last value + 1 return '+' string
        // Otherwise return empty string
        if (playersMap[player] && playersMap[player][index]) {
            return playersMap[player][index].toString();
        } else if (index === playersMap[player].length) {
            return '+';
        }

        return '';
    }

    const rows = Object.values(playersMap).reduce((max, player) => Math.max(max, player.length), 0) + 1;
    return <table>
        <thead>
            <tr>
                {Object.keys(playersMap).map((player) => <th key={player}>{player}</th>)}
            </tr>
        </thead>
        <tbody>
            {
                Array.from({ length: rows }).map((_, index) => (
					<tr key={index}>
                        {Object.keys(playersMap).map((player) => (
							<td key={player}
								onClick={index === playersMap[Number(player)].length ? () => addScore(Number(player), 50) : undefined}
							>
								{calculateLabel(Number(player), index)}
							</td>
						))}
                    </tr>
				))
            
            }
            {/* <tr>
                {Object.keys(playersMap).map((player) => <td onClick={() => addScore(Number(player), 10)}>+</td>)}
            </tr> */}
        </tbody>
    </table>
}