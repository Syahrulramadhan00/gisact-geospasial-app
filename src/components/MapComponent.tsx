
import { buildingLayerStyle } from '@/lib/constants';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Layer, LayerProps, NavigationControl, Source } from 'react-map-gl/mapbox';



interface MapComponentProps {
  geoJsonData: any;
  isBuildingLayerVisible: boolean;
  basemapStyle: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ geoJsonData, isBuildingLayerVisible, basemapStyle }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic3lhaHJ1bHJhbWFkaGFuIiwiYSI6ImNtY25od3VqYTB1bjcybHFxZGJxMW9zZm4ifQ.97h3GCeDKZn6DEeVe2SuiQ"
        initialViewState={{
          longitude: 107.589654,
          latitude: -6.979202,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={basemapStyle}
      >
        <NavigationControl position="top-right" />
        <Source id="buildings-source" type="geojson" data={geoJsonData}>
          <Layer
            {...buildingLayerStyle}
            layout={{
              'visibility': isBuildingLayerVisible ? 'visible' : 'none'
            }}
          />
        </Source>
      </Map>
    </div>
  );
};
