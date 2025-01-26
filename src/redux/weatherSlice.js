import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const API_KEY = "4700b0da898644f48fd25221252601"
const BASE_URL = "https://api.weatherapi.com/v1"

export const fetchForecastByCity = createAsyncThunk (
  "weather/feactForecastByCity", 
  async (city) => {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`
    )
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather", 
  initialState: {
    forecast: {},
    sattus: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecastByCity.fulfilled, (state, action) => {
      state.forecast = action.payload
    })
  }
});

export default weatherSlice.reducer;