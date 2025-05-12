import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPlayersSuccess,
  fetchPlayersFailure,
  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteFailure,
  fetchPlayersRequest,
} from "../slices/playersSlice";
import {
  fetchPlayers,
  toggleFavoritePlayer,
} from "@/api/services/playerServices";
import { Player } from "@/types";

function* fetchPlayersSaga() {
  try {
    const players: Player[] = yield call(fetchPlayers);
    yield put(fetchPlayersSuccess(players));
  } catch (error) {
    yield put(
      fetchPlayersFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

function* toggleFavoriteSaga(action: ReturnType<typeof toggleFavoriteRequest>) {
  try {
    yield call(toggleFavoritePlayer, action.payload);
    yield put(toggleFavoriteSuccess(action.payload));
  } catch (error) {
    yield put(
      toggleFavoriteFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchPlayersRequest.type, fetchPlayersSaga),
    takeLatest(toggleFavoriteRequest.type, toggleFavoriteSaga),
  ]);
}
