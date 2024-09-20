'use client'

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { BackgroundBeams } from './ui/background-beams';

export default function Hero() {
    const [query, setQuery] = useState<string>('');

    return (
        <div className='select-none'>
            <div className='min-h-screen w-full flex flex-col justify-center items-center text-left'>
                <div className='block'>
                    <h1>Discover and Explore</h1>
                    <h2>Stunning Images</h2>
                </div>
                <div className='mt-5 md:mt-12 text-gray-300 md:mr-48'>
                    <p>Welcome to my image gallery, where you can</p>
                    <p>effortlessly search and explore a vast collection of</p>
                    <p>stunning visuals from Pixabay.</p>
                </div>
                <SearchBar onSearch={setQuery} />
            </div>

            <Gallery query={query} />
        </div>
    );
}
