'use client'

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);

        // Scroll to the gallery section
        const galleryElement = document.getElementById('gallery');
        if (galleryElement) {
            galleryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <form onSubmit={handleSearch} className=" px-4 py-6 flex w-full md:mt-12 mt-6 justify-center items-center gap-4 z-10">
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
