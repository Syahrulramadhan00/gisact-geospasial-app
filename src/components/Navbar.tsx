import React from 'react'
import { Searchbar } from './Searchbar'

export const Navbar = () => {
  return (
    <div className='w-1/2 h-15 fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-400/20 backdrop-blur-[2px] border-b border-neutral-400/20'>
        <nav className='flex items-center justify-between px-4 h-full'>
            <div className='text-neutral-800 text-xl font-bold'>GISACT MAP</div>
            <Searchbar />
        </nav>
    </div>
  )
}