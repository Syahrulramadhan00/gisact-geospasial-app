import React from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/features/mapSlices';

export const Searchbar = () => {
  const dispatch = useAppDispatch();
  // Get the current search query from the Redux store
  const searchQuery = useAppSelector((state) => state.map.searchQuery);

  // Handle input changes and dispatch the action to update the store
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className='relative w-full lg:w-auto'>
      <div className='flex items-center h-full'>
        <input
          type='text'
          placeholder='Search by Building ID...'
          value={searchQuery} // Bind the input value to the Redux state
          onChange={handleInputChange} // Update the state on change
          className='w-full lg:w-64 h-10 px-4 text-neutral-700 bg-transparent border-none rounded-2xl outline-none placeholder:text-neutral-500'
        />
        <Search className='absolute right-3 w-5 h-5 text-neutral-700 pointer-events-none' />
      </div>
    </div>
  );
};
