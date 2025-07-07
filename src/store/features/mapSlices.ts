import { basemapStyles } from "@/lib/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MapState {
  isBuildingLayerVisible: boolean;
  basemapStyle: string;
  searchQuery: string; // To hold the current search input
}

const initialState: MapState = {
  isBuildingLayerVisible: true,
  basemapStyle: basemapStyles[0].url,
  searchQuery: "", // Initialize as empty
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBasemapStyle: (state, action: PayloadAction<string>) => {
      state.basemapStyle = action.payload;
    },
    toggleBuildingLayer: (state, action: PayloadAction<boolean>) => {
      state.isBuildingLayerVisible = action.payload;
    },
    // Reducer to update the search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});


export const { setBasemapStyle, toggleBuildingLayer, setSearchQuery } = mapSlice.actions;
