import { v4 as uuid } from "uuid";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Train, TrainCharacteristic } from "../types";
import { RootState } from "../store";

interface TrainState {
  trains: Train[];
  selectedTrain: Train | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TrainState = {
  trains: [],
  selectedTrain: null,
  isLoading: false,
  error: null,
};

export const fetchTrains = createAsyncThunk("trains/fetchTrains", async () => {
  const res = await fetch(
    "https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json"
  );
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
});

const trainSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    selectTrain: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const selectedTrain = state.trains.find(
        (train) => action.payload.id === train.id
      );
      if (selectedTrain) {
        state.selectedTrain = selectedTrain;
      }
    },
    updateTrainCharacteristic: (
      state,
      action: PayloadAction<{
        id: string;
        characteristics: TrainCharacteristic[];
      }>
    ) => {
      const trainIndex = state.trains.findIndex(
        (train) => train.id === action.payload.id
      );
      if (trainIndex !== -1) {
        state.trains[trainIndex].characteristics =
          action.payload.characteristics;
      }
      state.selectedTrain = state.trains[trainIndex];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrains.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        const trains = action.payload;
        const updatedTrains: Train[] = trains.map((train: Train) => ({
          ...train,
          id: uuid(),
        }));
        state.isLoading = false;
        state.trains = updatedTrains;
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export const { updateTrainCharacteristic, selectTrain } = trainSlice.actions;

export const selectTrains = (state: RootState) => state.train.trains;
export const selectSelectedTrain = (state: RootState) =>
  state.train.selectedTrain;

export default trainSlice.reducer;
