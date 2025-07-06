import React from 'react';
import { Searchbar } from './Searchbar';


export const Navbar = () => {
  return (
    <div className='fixed top-4 right-14 lg:left-1/2 lg:-translate-x-1/2 lg:w-1/2 h-16 z-20 rounded-2xl bg-neutral-400/20 backdrop-blur-[2px] border-b border-neutral-400/20'>
      <nav className='flex items-center justify-between px-4 h-full'>
        <div className='hidden lg:block text-neutral-700 text-xl font-bold'>GISACT MAP</div>
        <Searchbar />
      </nav>
    </div>
  );
};
