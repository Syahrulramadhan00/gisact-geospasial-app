import React from 'react';
import { Search } from 'lucide-react';

export const Searchbar = () => {
  return (
    <div className='relative w-full lg:w-auto'>
      <div className='flex items-center h-full'>
        <input
          type='text'
          placeholder='Search...'

          className='w-full lg:w-64 h-10 px-4 text-neutral-700 bg-transparent border-none rounded-2xl outline-none placeholder:text-neutral-600'
        />
        <Search className='absolute right-3 w-5 h-5 text-neutral-700 pointer-events-none' />
      </div>
    </div>
  );
};
