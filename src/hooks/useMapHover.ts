import { useState, useCallback } from 'react';
import { MapLayerMouseEvent } from 'mapbox-gl';

// Defines the structure for hover information
interface HoverInfo {
  longitude: number;
  latitude: number;
  properties: any;
}

/**
 * A custom hook to manage hover interactions on the map.
 * @returns An object containing the current hoverInfo, and onHover/onMouseLeave callbacks.
 */
export const useMapHover = () => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  // Callback for when the mouse moves over the map
  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const { features, lngLat } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature ? {
      properties: hoveredFeature.properties,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    } : null);
  }, []);

  // Callback for when the mouse leaves the map
  const onMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);

  return { hoverInfo, onHover, onMouseLeave };
};
