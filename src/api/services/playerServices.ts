import { Player, PlayersResponse } from "@/types";
import { fetchPlayersApi } from "..";

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetchPlayersApi();
    if (response && response.playerList.length > 0) {
      return response.playerList.map((player, index) => ({
        ...player,
        handicap: player.handicap ? Number(player.handicap) : 0,

        id: `player-${index}-${Date.now()}`,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const toggleFavoritePlayer = async (playerId: string): Promise<void> => {
  try {
    console.log(`Estado favorito cambiado ${playerId}`);
    return Promise.resolve();
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw error;
  }
};
