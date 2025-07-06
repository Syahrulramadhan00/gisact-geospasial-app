import { Dispatch } from "@reduxjs/toolkit";
import { ChevronDown, ChevronUp, MapIcon } from "lucide-react";
import { SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBasemapStyle } from "@/store/features/mapSlices";
import { basemapStyles } from "@/lib/constants";

interface BasemapControlProps {
    onStyleChange: Dispatch<SetStateAction<String>>;
    currentStyle: String;
}

export const BasemapControl: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useAppDispatch();
    const currentStyle = useAppSelector(state => state.map.basemapStyle);

    return (
        <div className="absolute bottom-4 left-4 z-10 w-64">
             <div className="bg-neutral-400/20 backdrop-blur-[2px] border-b border-neutral-400/20 rounded-lg">
                <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <MapIcon className="h-5 w-5 mr-2 text-gray-700" />
                        <h3 className="font-semibold text-gray-800">Basemap</h3>
                    </div>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-600"/> : <ChevronDown className="h-5 w-5 text-gray-600"/>}
                </div>
                {isOpen && (
                     <div className="p-2 border-t border-gray-200 grid grid-cols-3 gap-2">
                        {basemapStyles.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => dispatch(setBasemapStyle(style.url))}
                                className={`p-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                                    currentStyle === style.url
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
