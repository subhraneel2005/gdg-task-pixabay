'use client'

import React, { useState } from 'react'

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
    <form onSubmit={handleSearch} className="p-4">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search images..."
      className="w-full p-2 border rounded text-black"
    />
    <button type="submit" className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
      Search
    </button>
  </form>
  )
}
