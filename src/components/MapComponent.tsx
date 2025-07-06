// src/components/MapComponent.tsx

import { MapLayerMouseEvent, LayerProps } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useState, useMemo } from 'react';
import Map, { Layer, NavigationControl, Popup, Source } from 'react-map-gl/mapbox';
import { BuildingDetail } from './BuildingDetail';
import '@/styles/mapbox-override.css';
import { RT_COLORS } from '@/lib/constants';

interface HoverInfo {
  longitude: number;
  latitude: number;
  properties: any; 
}

interface MapComponentProps {
  geoJsonData: any;
  isBuildingLayerVisible: boolean;
  basemapStyle: string;
}


export const MapComponent: React.FC<MapComponentProps> = ({ geoJsonData, isBuildingLayerVisible, basemapStyle }) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const { features, lngLat } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature ? {
      properties: hoveredFeature.properties,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    } : null);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);


  const dynamicBuildingLayerStyle: LayerProps = useMemo(() => {

    if (!geoJsonData || !geoJsonData.features) {
      return {
        id: 'buildings-layer',
        type: 'fill',
        paint: { 'fill-color': '#CCCCCC', 'fill-opacity': 0.7 }
      };
    }

    // Generate the 'match' expression for colors based on the 'RTNew' property
    const colorExpression: any[] = ['match', ['get', 'RTNew']];
    const uniqueRTs = [...new Set(geoJsonData.features.map((f: any) => f.properties.RTNew))];

    uniqueRTs.forEach((rt, index) => {

      colorExpression.push(rt, RT_COLORS[index % RT_COLORS.length]);
    });

    // Add a fallback color for any RT not explicitly matched
    colorExpression.push('#CCCCCC'); // Default grey color

    return {
      id: 'buildings-layer',
      type: 'fill',
      paint: {
        'fill-color': colorExpression,
        'fill-opacity': 0.75,
        'fill-outline-color': 'black' // Add an outline for better definition
      }
    };
  }, [geoJsonData]);

  return (
    <div className="absolute inset-0 z-0">
      <Map
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
            layout={{
              'visibility': isBuildingLayerVisible ? 'visible' : 'none'
            }}
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