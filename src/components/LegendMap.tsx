import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the shape of a single legend item
interface LegendItem {
  rt: string | number;
  color: string;
}

// Define the props for the LegendMap component
interface LegendMapProps {
  legendItems: LegendItem[];
}


export const LegendMap: React.FC<LegendMapProps> = ({ legendItems }) => {
  return (
    <Card className="h-full w-full bg-neutral-400/20 backdrop-blur-[2px] border-b border-neutral-400/20 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-base">Legend</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 max-h-60 overflow-y-auto">
        <div className="space-y-2">
          {legendItems.map((item) => (
            <div key={item.rt} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3 border border-black/50"
                style={{ backgroundColor: item.color, opacity: 0.75 }}
              />
              <span className="text-sm font-medium">{item.rt}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
