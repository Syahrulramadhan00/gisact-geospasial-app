
import { basemapStyles } from "@/lib/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  isBuildingLayerVisible: boolean;
  basemapStyle: string;
}

const initialState: MapState = {
  isBuildingLayerVisible: true,
  basemapStyle: basemapStyles[0].url,
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
  },
});

export const { setBasemapStyle, toggleBuildingLayer } = mapSlice.actions;