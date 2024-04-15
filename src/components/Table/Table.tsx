import type { PlayersMap } from '../GameContainer/GameContainer';

import './index.css';

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
		<table>
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
	);
}