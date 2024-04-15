import type { PlayersMap } from './GameContainer';

interface TableProps {
	playersMap: PlayersMap;
	displayModalForPlayer: (playerId: number) => void;
}

export default function Table({ playersMap, displayModalForPlayer }: TableProps) {
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
  return (
    <div className="relative overflow-x-auto w-full">
      <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(playersMap).map((player) => <th scope="col" className="px-6 py-3" key={player}>{player}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            Array.from({ length: rows }).map((_, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                {Object.keys(playersMap).map((player) => (
                  <td className="px-6 py-4" key={player}
                    onClick={index === playersMap[Number(player)].length ? () => displayModalForPlayer(Number(player)) : undefined}
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