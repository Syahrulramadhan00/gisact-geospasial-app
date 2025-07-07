import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getCenterCoordinate } from '@/lib/map-styles';
import { MapRef } from 'react-map-gl/mapbox';


export const useMapSearch = (mapRef: React.RefObject<MapRef>, geoJsonData: any) => {
  const searchQuery = useAppSelector((state) => state.map.searchQuery);

  useEffect(() => {
    if (searchQuery && geoJsonData?.features) {
      const searchedFeature = geoJsonData.features.find(
        (f: any) => f.properties.Id.toString().toLowerCase() === searchQuery.toLowerCase()
      );

      if (searchedFeature && mapRef.current) {
        const center = getCenterCoordinate(searchedFeature);

        if (center && !isNaN(center[0]) && !isNaN(center[1])) {
          mapRef.current.flyTo({
            center: center,
            zoom: 19,
            essential: true,
          });
        } else {
          console.error("Could not fly to feature because its coordinates are invalid:", searchedFeature);
        }
      }
    }
  }, [searchQuery, geoJsonData, mapRef]);
};
