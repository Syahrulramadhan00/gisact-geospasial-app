import { useMemo } from 'react';
import { LayerProps } from 'mapbox-gl';
import { RT_COLORS } from '@/lib/constants';

/**
 * Safely extracts the first coordinate from a GeoJSON feature's geometry.
 * Handles both Polygon and MultiPolygon types.
 * @param feature A GeoJSON feature.
 * @returns A [longitude, latitude] array or null if not found.
 */
export const getCenterCoordinate = (feature: any): [number, number] | null => {
  const geom = feature?.geometry;
  if (!geom || !geom.coordinates) return null;

  try {
    if (geom.type === 'Polygon') {
      const point = geom.coordinates[0][0];
      if (Array.isArray(point) && point.length >= 2) return point as [number, number];
    } else if (geom.type === 'MultiPolygon') {
      const point = geom.coordinates[0][0][0];
      if (Array.isArray(point) && point.length >= 2) return point as [number, number];
    }
  } catch (e) {
    console.error("Error extracting coordinate from feature:", feature, e);
    return null;
  }
  return null;
};


export const useDynamicLayerStyle = (geoJsonData: any): LayerProps => {
    return useMemo(() => {
        if (!geoJsonData || !geoJsonData.features) {
            return { id: 'buildings-layer', type: 'fill', paint: { 'fill-color': '#CCCCCC' } };
        }
        const colorExpression: any[] = ['match', ['get', 'RTNew']];
        const uniqueRTs = [...new Set(geoJsonData.features.map((f: any) => f.properties.RTNew))];
        uniqueRTs.forEach((rt, index) => {
            colorExpression.push(rt, RT_COLORS[index % RT_COLORS.length]);
        });
        colorExpression.push('#CCCCCC'); // Fallback color
        return {
            id: 'buildings-layer',
            type: 'fill',
            paint: {
                'fill-color': colorExpression,
                'fill-opacity': 0.75,
                'fill-outline-color': 'black'
            }
        };
    }, [geoJsonData]);
};
