import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, PlayerGroup } from "../../types";

export const fetchPlayersRequest = createAction("players/fetchPlayersRequest");
export const fetchPlayersSuccess = createAction<Player[]>(
  "players/fetchPlayersSuccess"
);
export const fetchPlayersFailure = createAction<string>(
  "players/fetchPlayersFailure"
);
export const toggleFavoriteRequest = createAction<string>(
  "players/toggleFavoriteRequest"
);
export const toggleFavoriteSuccess = createAction<string>(
  "players/toggleFavoriteSuccess"
);
export const toggleFavoriteFailure = createAction<string>(
  "players/toggleFavoriteFailure"
);

interface PlayersState {
  data: Player[];
  filteredPlayers: Player[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGroup: PlayerGroup;
}

const initialState: PlayersState = {
  data: [],
  filteredPlayers: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedGroup: 1,
};

type PlayersAction =
  | ReturnType<typeof fetchPlayersRequest>
  | ReturnType<typeof fetchPlayersSuccess>
  | ReturnType<typeof fetchPlayersFailure>
  | ReturnType<typeof toggleFavoriteRequest>
  | ReturnType<typeof toggleFavoriteSuccess>
  | ReturnType<typeof toggleFavoriteFailure>;

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredPlayers = filterPlayers(
        state.data,
        state.searchQuery,
        state.selectedGroup
      );
    },
    setSelectedGroup: (state, action: PayloadAction<PlayerGroup>) => {
      state.selectedGroup = action.payload;
      state.filteredPlayers = filterPlayers(
        state.data,
        state.searchQuery,
        state.selectedGroup
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayersSuccess, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredPlayers = filterPlayers(
          action.payload,
          state.searchQuery,
          state.selectedGroup
        );
      })
      .addCase(fetchPlayersFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavoriteSuccess, (state, action) => {
        const playerId = action.payload;
        state.data = state.data.map((player) =>
          player.id === playerId
            ? { ...player, isFavorite: !player.isFavorite }
            : player
        );
        state.filteredPlayers = filterPlayers(
          state.data,
          state.searchQuery,
          state.selectedGroup
        );
      });
  },
});

const filterPlayers = (
  players: Player[],
  searchQuery: string,
  selectedGroup: PlayerGroup
): Player[] => {
  return players.filter(
    (player) =>
      player.team === selectedGroup &&
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const { setSearchQuery, setSelectedGroup } = playersSlice.actions;
export default playersSlice.reducer;

export type { PlayersAction, PlayersState };
