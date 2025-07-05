'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';


const dummyLayerData = [
  { id: 1, name: 'satellite' },
  { id: 2, name: 'road' },
  { id: 3, name: 'terrain' },
  { id: 4, name: 'hybrid' },
];

export const MenuLayer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 left-4 z-50 w-1/6">
      <div className="rounded-2xl bg-neutral-400/20 backdrop-blur-[2px] border border-neutral-400/20 shadow-lg">
        <div
          className="flex flex-row items-center justify-between px-4 h-14 cursor-pointer"
          onClick={toggleAccordion} 
        >
          <div className="text-neutral-800 text-xl font-bold">Menu Layer</div>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isOpen && (
          <div className="p-4 border-t border-neutral-400/20">
            <ul className="space-y-2">
              {dummyLayerData.map((layer) => (
                <li
                  key={layer.id}
                  className="text-neutral-700 cursor-pointer hover:bg-neutral-300/30 p-2 rounded-md"
                >
                  {layer.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};