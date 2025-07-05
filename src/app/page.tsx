'use client';
import { BasemapControl } from "@/components/BasemapControl";
import { LayerControl } from "@/components/LayerControl";
import { MapComponent } from "@/components/MapComponent";
import { dummyGeoJsonData } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";

import { useEffect, useState } from "react";

export default function App() {
  const { isBuildingLayerVisible, basemapStyle } = useAppSelector(state => state.map);
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/data/dummy-data-for-test.geojson')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setGeoJsonData(data))
      .catch(error => {
        console.warn("Could not fetch real GeoJSON. Using fallback dummy data.", error);
        setGeoJsonData(dummyGeoJsonData);
      });
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden font-sans">
      <LayerControl />
      <BasemapControl />
      
      {geoJsonData ? (
        <MapComponent
          geoJsonData={geoJsonData}
          isBuildingLayerVisible={isBuildingLayerVisible}
          basemapStyle={basemapStyle}
        />
      ) : (
        <div className="flex items-center justify-center h-full">Loading map data...</div>
      )}
    </main>
  );
}