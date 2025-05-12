import { Player, PlayersResponse } from "@/types";
import { apiClient } from "..";

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await apiClient.get<PlayersResponse>("/player/list");
    if (response.data && response.data.playerList.length > 0) {
      return response.data.playerList.map((player, index) => ({
        ...player,
        handicap: player.handicap ? parseFloat(player.handicap) : 0,
        id: `player-${index}-${Date.now()}`,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
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
