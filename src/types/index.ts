export interface Player {
  id: string;
  cedula_passport: string;
  diestro: string | null;
  foursome?: number;
  ghin: string;
  handicap: number;
  image?: string;
  name: string;
  other_pair_document?: string;
  patrocinador?: string | null;
  playing_handicap: string | null;
  team: number | string;
  isFavorite?: boolean;
}

export interface PlayersResponse {
  playerList: Player[];
  success: boolean;
  message?: string;
}

export type PlayerGroup = 1 | 2 | 3;
