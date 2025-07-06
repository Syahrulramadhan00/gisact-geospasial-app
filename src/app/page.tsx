'use client';
import { BasemapControl } from "@/components/BasemapControl";
import { LayerControl } from "@/components/LayerControl";
import { LegendMap } from "@/components/LegendMap";
import { MapComponent } from "@/components/MapComponent"; // Import RT_COLORS
import { Navbar } from "@/components/Navbar";
import { dummyGeoJsonData, RT_COLORS } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState, useMemo } from "react";

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


  const legendItems = useMemo(() => {
    if (!geoJsonData || !geoJsonData.features) {
      return [];
    }

    const uniqueRTs = [...new Set(geoJsonData.features.map((f: any) => f.properties.RTNew))]
      .sort((a, b) => a - b);
      

    return uniqueRTs.map((rt, index) => ({
      rt,
      color: RT_COLORS[index % RT_COLORS.length],
    }));
  }, [geoJsonData]);

  return (
    <main className="relative h-screen w-screen overflow-hidden font-sans">
      <Navbar />
      <LayerControl />
      <BasemapControl />

      {geoJsonData ? (
        <>
          <MapComponent
            geoJsonData={geoJsonData}
            isBuildingLayerVisible={isBuildingLayerVisible}
            basemapStyle={basemapStyle}
          />
          {/* Position the LegendMap component on the bottom right */}
          <div className="absolute bottom-5 right-5 z-10">
            <LegendMap legendItems={legendItems} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">Loading map data...</div>
      )}
    </main>
  );
}
