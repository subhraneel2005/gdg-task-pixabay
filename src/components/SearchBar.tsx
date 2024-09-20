'use client'

import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
    onSearch: (query: string) => void;
  }

export default function SearchBar({onSearch}: SearchBarProps){

    const [query, setQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    }
  return (
    <form onSubmit={handleSearch} className="px-12 py-6 flex w-full mt-12 justify-center items-center gap-4 z-10">
    <Input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search images..."
      className='max-w-4xl'
    />
    <Button type="submit">
      Search
    </Button>
  </form>
  )
}
