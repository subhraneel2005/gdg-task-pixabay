'use client'

import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { TextRotate } from './ui/text-rotate';

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  }
]

export default function Hero() {
    const [query, setQuery] = useState<string>('');

    return (
        <div className='select-none relative overflow-hidden'>
            <Floating sensitivity={-0.5} className="h-full">
                <FloatingElement
                    depth={0.5}
                    className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
                >
                    <motion.img
                        src={exampleImages[0].url}
                        alt={exampleImages[0].title}
                        className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={1}
                    className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
                >
                    <motion.img
                        src={exampleImages[1].url}
                        alt={exampleImages[1].title}
                        className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={4}
                    className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
                >
                    <motion.img
                        src={exampleImages[2].url}
                        alt={exampleImages[2].title}
                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    />
                </FloatingElement>

                <FloatingElement
                    depth={2}
                    className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
                >
                    <motion.img
                        src={exampleImages[3].url}
                        alt={exampleImages[3].title}
                        className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    />
                </FloatingElement>
            </Floating>

            <div className='min-h-screen w-full flex flex-col justify-center items-center text-left -mt-10 z-50 relative'>
                <motion.h1
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight space-y-1 md:space-y-4"
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
                >
                    <span>Discover images</span>
                    <LayoutGroup>
                        <motion.span layout className="flex leading-tight font-semibold">
                            <motion.span
                                layout
                                className="flex whitespace-pre"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            >
                             that are{" "}
                            </motion.span>
                            <TextRotate
                                texts={[
                                    "special",
                                    "vibrant",
                                    "magical",
                                    "natural",
                                    "passion"
                                ]}
                                mainClassName="overflow-hidden pr-3 text-blue-600 py-0 pb-2 md:pb-4 rounded-xl"
                                staggerDuration={0.03}
                                staggerFrom="last"
                                rotationInterval={3000}
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            />
                        </motion.span>
                    </LayoutGroup>
                </motion.h1>
                
                <motion.div 
                    className='mt-8 md:mt-12 text-gray-500 text-center'
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
                >
                    <p className='text-[14px] md:text-lg px-4'>
                        Explore a vibrant collection of images from Pixabay. <br/>
                        Search, discover, and get inspired by visual stories.
                    </p>
                </motion.div>
                
                <SearchBar onSearch={setQuery} />
            </div>

            <Gallery query={query} />
        </div>
    );
}