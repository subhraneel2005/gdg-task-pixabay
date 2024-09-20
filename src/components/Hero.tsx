'use client'

import React,{useState} from 'react'
import SearchBar from './SearchBar';
import Gallery from './Gallery';

export default function Hero() {
    const [query,setQuery] = useState<string>('');
  return (
    <div>
        <SearchBar onSearch={setQuery}/>
        <Gallery query={query}/>
    </div>
  )
}
