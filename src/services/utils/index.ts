import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrains = createAsyncThunk("trains/fetchTrains", async () => {
    const res = await fetch(
      "https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json"
    );
    return res.ok
      ? res.json()
      : res.json().then((err) => Promise.reject(err));
  });
  