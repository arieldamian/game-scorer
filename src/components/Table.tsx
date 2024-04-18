import type { Players, Scores } from './GameContainer';

interface TableProps {
  players: Players;
	scores: Scores;
	displayModalForPlayer: (playerId: number) => void;
}

export default function Table({ players, scores, displayModalForPlayer }: TableProps) {
	const calculateLabel = (player: number, index: number): string => {
		// If player exists and has a score at the given index, return the score
		// If position is last value + 1 return '+' string
		// Otherwise return empty string
		if (scores[player] && scores[player][index]) {
			return scores[player][index].toString();
		} else if (index === scores[player].length) {
			return '+';
		}

		return '';
	}

  const rows = Object.values(scores).reduce((max, player) => Math.max(max, player.length), 0) + 1;
  return (
    <div className="relative overflow-x-auto shadow-md rounded-sm w-full">
      <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.entries(players).map(([id, playerName]) => <th scope="col" className="px-6 py-3" key={id}>{playerName}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            Array.from({ length: rows }).map((_, index) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                {Object.keys(scores).map((player) => (
                  <td className="px-6 py-4" key={player}
                    onClick={index === scores[Number(player)].length ? () => displayModalForPlayer(Number(player)) : undefined}
                  >
                    {calculateLabel(Number(player), index)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
	);
}