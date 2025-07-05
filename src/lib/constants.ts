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