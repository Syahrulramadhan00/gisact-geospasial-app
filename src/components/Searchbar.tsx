import React from 'react'
import { Search } from 'lucide-react';

export const Searchbar = () => {
  return (
    <div className='w-1/4 h-10 flex top-4 right-4 z-50 rounded-2xl bg-neutral-400/20 backdrop-blur-[2px] border-b border-neutral-400/20'>
        <div className='flex items-center h-full px-4'>
            <input
                type='text'
                placeholder='Search...'
                className='w-full h-full px-4 text-neutral-800 bg-transparent border-none outline-none'
            />
            <Search className='w-5 h-5 text-neutral-800' />
        </div>
    </div>
  )
}
