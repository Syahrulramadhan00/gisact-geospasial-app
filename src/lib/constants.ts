import { LayerProps } from "react-map-gl/mapbox";

export const dummyGeoJsonData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.58, -6.97],
            [107.59, -6.97],
            [107.59, -6.98],
            [107.58, -6.98],
            [107.58, -6.97],
          ],
        ],
      },
    },
  ],
};

export const buildingLayerStyle: LayerProps = {
  id: 'buildings-layer',
  type: 'fill',
  paint: {
    'fill-color': '#007cbf',
    'fill-opacity': 0.5,
    'fill-outline-color': '#005a8c',
  },
};

interface BasemapStyle {
  id: string;
  name: string;
  url: string;
}
export const basemapStyles: BasemapStyle[] = [
  { id: 'light', name: 'Light', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark', name: 'Dark', url: 'mapbox://styles/mapbox/dark-v11' },
  { id: 'satellite', name: 'Satellite', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
];

export const RT_COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B'
];