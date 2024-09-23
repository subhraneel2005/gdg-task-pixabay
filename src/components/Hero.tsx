'use client'

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { BackgroundBeams } from './ui/background-beams';
import Nav from './Nav';

export default function Hero() {
    const [query, setQuery] = useState<string>('');

    return (
        <div className='select-none'>
            <Nav/>
            <div className='min-h-screen w-full flex flex-col justify-center items-center text-left -mt-10'>
        
                    <h1 className='px-4 text-[40px] md:text-[64px] flex flex-wrap leading-tight'>Discover and Explore</h1>
                    <h1 className='px-4 text-[40px] md:text-[64px] flex flex-wrap leading-tight'>Stunning Images</h1>
               
                <div className='mt-8 md:mt-12 text-gray-300'>
                    <p className='text-[14px] md:text-lg flex flex-wrap px-4'>Welcome to my image gallery, where you can effortlessly search and explore</p>
                    <p className='text-[14px] md:text-lg flex flex-wrap px-4'> a vast collection of stunning visuals from Pixabay.</p>
                </div>
                <SearchBar onSearch={setQuery} />
            </div>

            <Gallery query={query} />
        </div>
    );
}
