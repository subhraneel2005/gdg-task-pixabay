'use client';

import { fetchImages, Images } from '@/helper';
import React, { Suspense, useEffect, useState } from 'react';
import { Lens } from "@/components/ui/lens";
import Image from 'next/image';
import ImageDialog from './commonDialog/ImageDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const Beams = () => {
  return (
    <svg
      width="380"
      height="315"
      viewBox="0 0 380 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
    >
       <g filter="url(#filter0_f_120_7473)">
        <circle cx="34" cy="52" r="114" fill="#1E90FF" />
      </g>
      <g filter="url(#filter1_f_120_7473)">
        <circle cx="332" cy="24" r="102" fill="#4169E1" />
      </g>
      <g filter="url(#filter2_f_120_7473)">
        <circle cx="191" cy="53" r="102" fill="#4682B4" />
      </g>
      <defs>
        <filter
          id="filter0_f_120_7473"
          x="-192"
          y="-174"
          width="452"
          height="452"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="56"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
        <filter
          id="filter1_f_120_7473"
          x="70"
          y="-238"
          width="524"
          height="524"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
        <filter
          id="filter2_f_120_7473"
          x="-71"
          y="-209"
          width="524"
          height="524"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
      </defs>
    </svg>
  );
};

const Rays = ({ className }: { className?: string }) => {
  return (
    <svg
      width="380"
      height="397"
      viewBox="0 0 380 397"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute left-0 top-0 pointer-events-none z-[1]",
        className
      )}
    >
      <g filter="url(#filter0_f_120_7480)">
        <path
          d="M-37.4202 -76.0163L-18.6447 -90.7295L242.792 162.228L207.51 182.074L-37.4202 -76.0163Z"
          fill="url(#paint0_linear_120_7480)"
        />
      </g>
    </svg>
  );
};

const LoadingCard = () => {
  return (
    <motion.div 
      className="w-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-gradient-to-r from-[#1D2235] to-[#121318] p-8 my-10"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Beams />
      <Rays />
      <div className="relative z-10">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-700 rounded-2xl mb-4"></div>
          <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Gallery({ query }: { query: string }) {
    const [imgs, setImgs] = useState<Images[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Images | null>(null);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    const loadImages = async () => {
        try {
            const data = await fetchImages(query);
            setImgs(data);
        } catch (error) {
            console.error("Failed to load images:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, [query]);

    if (loading) return (
        <div id='gallery' className="min-h-screen w-full relative">
           
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-6 md:mb-14 text-2xl md:text-5xl text-white'
                >
                    Searching Images 🔍
                </motion.h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-8 px-4">
                    {[1, 2, 3].map((_, index) => (
                        <LoadingCard key={index} />
                    ))}
                </div>
            </main>
        </div>
    );

    if (imgs.length === 0) return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#1D2235] to-[#121318]">
            <motion.p 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white text-2xl"
            >
                No images found. 🕵️‍♀️
            </motion.p>
        </div>
    );

    return (
        <div id='gallery' className="min-h-screen w-full relative">
          
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
                <h1 className='text-center mb-6 md:mb-14 text-2xl md:text-5xl text-white'>Images🎉</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-8 px-4">
                    <AnimatePresence>
                        {open && selectedImage && (
                            <Suspense fallback={<p>...Loading</p>}>
                                <ImageDialog
                                    id={selectedImage.id}
                                    open={open}
                                    setOpen={setOpen}
                                    image={selectedImage.webformatURL}
                                    tags={selectedImage.tags}
                                    title={selectedImage.user}
                                />
                            </Suspense>
                        )}

                        {imgs.map((image) => (
                            <motion.div 
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-gradient-to-r from-[#1D2235] to-[#121318] p-8 my-10"
                            >
                                <Beams />
                                <Rays />
                                <div className="relative z-10">
                                    <Lens 
                                        hovering={hoveredImage === image.webformatURL}
                                        setHovering={(isHovering) => 
                                            setHoveredImage(isHovering ? image.webformatURL : null)
                                        }
                                    >
                                        <Image 
                                            src={image.webformatURL} 
                                            alt={image.user} 
                                            width={500} 
                                            height={500} 
                                            className='rounded-2xl object-contain' 
                                            onClick={() => { setOpen(true); setSelectedImage(image); }}
                                        />
                                    </Lens>
                                    <motion.div 
                                        animate={{
                                            filter: hoveredImage === image.webformatURL ? "blur(2px)" : "blur(0px)",
                                        }}
                                        className="py-4 relative z-20"
                                    >
                                        <h2 className="text-white text-2xl text-left font-bold">{image.user}</h2>
                                        <p className="text-neutral-200 text-left mt-4">{image.tags}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}