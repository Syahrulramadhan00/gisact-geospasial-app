// src/components/BuildingDetail.tsx

import { Building, Trash2, Home } from 'lucide-react';

interface BuildingDetailProps {
  buildingId: string | number;
  rt: string | number;
  plasticWaste: number;
  organicWaste: number;
  inorganicWaste: number;
}

export const BuildingDetail: React.FC<BuildingDetailProps> = ({
  buildingId,
  rt,
  plasticWaste,
  organicWaste,
  inorganicWaste,
}) => {
  return (
    <div className="w-64 p-4 bg-neutral-500/20 backdrop-blur-[2px] border-b border-neutral-700/20 rounded-lg">
      <div className="flex flex-col space-y-2">
        <h4 className="font-bold text-md text-neutral-700 border-b border-neutral-800/20 pb-2">
          Building Details
        </h4>
        {/* Use light text colors for contrast */}
        <div className="space-y-2 text-sm text-neutral-600">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            <p><strong>ID:</strong> {buildingId}</p>
          </div>
          <div className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            <p><strong>RT:</strong> {rt}</p>
          </div>
          <div className="flex items-center pt-2">
            <Trash2 className="mr-2 h-4 w-4" />
            <span className="text-xs font-semibold">Waste Data (kg):</span>
          </div>
          <ul className="list-disc list-inside text-xs text-neutral-600 pl-4">
            <li>Plastic: {plasticWaste || 0}</li>
            <li>Organic: {organicWaste || 0}</li>
            <li>Inorganic: {inorganicWaste || 0}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};