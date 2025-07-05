import { toggleBuildingLayer } from "@/store/features/mapSlices";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { SetStateAction, useState } from "react";

interface LayerControlProps {
    isVisible: boolean;
    onVisibilityChange: Dispatch<SetStateAction<boolean>>;
}

export const LayerControl: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useAppDispatch();
    const isVisible = useAppSelector(state => state.map.isBuildingLayerVisible);

    return (
        <div className="absolute top-4 left-4 z-10 w-64">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
                <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-gray-700" />
                        <h3 className="font-semibold text-gray-800">Data Layers</h3>
                    </div>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-600"/> : <ChevronDown className="h-5 w-5 text-gray-600"/>}
                </div>
                {isOpen && (
                    <div className="p-3 border-t border-gray-200">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={isVisible}
                                onChange={(e) => dispatch(toggleBuildingLayer(e.target.checked))}
                            />
                            <span className="text-gray-700">Buildings</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};