import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Player, PlayerGroup } from "../../types";
import {
  fetchPlayers,
  toggleFavoritePlayer,
} from "@/api/services/playerServices";

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

export const fetchPlayersAsync = createAsyncThunk(
  "players/fetchPlayers",
  async () => {
    return fetchPlayers();
  }
);

export const toggleFavoriteAsync = createAsyncThunk(
  "players/toggleFavorite",
  async (playerId: string) => {
    await toggleFavoritePlayer(playerId);
    return playerId;
  }
);

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
      .addCase(fetchPlayersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredPlayers = filterPlayers(
          action.payload,
          state.searchQuery,
          state.selectedGroup
        );
      })
      .addCase(fetchPlayersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch players";
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
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
