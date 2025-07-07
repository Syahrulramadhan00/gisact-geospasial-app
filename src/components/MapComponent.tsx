import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef } from 'react';
import Map, { Layer, NavigationControl, Popup, Source, MapRef } from 'react-map-gl/mapbox';
import { BuildingDetail } from './BuildingDetail';
import '@/styles/mapbox-override.css';
import { useMapSearch } from '@/hooks/useMapSearch';
import { useMapHover } from '@/hooks/useMapHover';
import { useDynamicLayerStyle } from '@/lib/map-styles';
import { useAppSelector } from '@/store/hooks';

interface MapComponentProps {
  geoJsonData: any;
}

export const MapComponent: React.FC<MapComponentProps> = ({ geoJsonData }) => {
  const mapRef = useRef<MapRef>(null);

  // Get state from Redux
  const { isBuildingLayerVisible, basemapStyle } = useAppSelector(state => state.map);


  useMapSearch(mapRef, geoJsonData);
  const { hoverInfo, onHover, onMouseLeave } = useMapHover();
  const dynamicBuildingLayerStyle = useDynamicLayerStyle(geoJsonData);

  return (
    <div className="absolute inset-0 z-0">
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1Ijoic3lhaHJ1bHJhbWFkaGFuIiwiYSI6ImNtY25od3VqYTB1bjcybHFxZGJxMW9zZm4ifQ.97h3GCeDKZn6DEeVe2SuiQ"
        initialViewState={{
          longitude: 107.589654,
          latitude: -6.979202,
          zoom: 16,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={basemapStyle}
        onMouseMove={onHover}
        onMouseLeave={onMouseLeave}
        interactiveLayerIds={['buildings-layer']}
        cursor={hoverInfo ? 'pointer' : 'default'}
      >
        <NavigationControl position="top-right" />
        <Source id="buildings-source" type="geojson" data={geoJsonData}>
          <Layer
            {...dynamicBuildingLayerStyle}
            layout={{ 'visibility': isBuildingLayerVisible ? 'visible' : 'none' }}
          />
        </Source>
        {hoverInfo && hoverInfo.properties && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            anchor="bottom"
            offset={10}
          >
            <BuildingDetail
              buildingId={hoverInfo.properties.Id}
              rt={hoverInfo.properties.RTNew}
              plasticWaste={hoverInfo.properties['Sampah Plastik (kg)']}
              organicWaste={hoverInfo.properties['Sampah Organik (kg)']}
              inorganicWaste={hoverInfo.properties['sampah Anorganik (kg)']}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
};
