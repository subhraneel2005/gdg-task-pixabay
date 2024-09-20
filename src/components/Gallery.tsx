'use client';

import { fetchImages, Images } from '@/helper';
import React, { useEffect, useState } from 'react';
import ImageDetail from './ImageDetail'; 
import { BackgroundGradient } from './ui/background-gradient';

export default function Gallery({ query }: { query: string }) {
    const [imgs, setImgs] = useState<Images[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<Images | null>(null);

    useEffect(() => {
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
        loadImages();
    }, [query]);

    if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    if (imgs.length === 0 && !loading) return <div className="flex justify-center items-center h-screen"><p>No images found.</p></div>;

    const handleImageClick = (image: Images) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen w-full">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {imgs.map((image) => (
                        
                        <div
                            key={image.id}
                            className="cursor-pointer overflow-hidden rounded-[24px] border border-zinc-300"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image.webformatURL}
                                alt={image.tags}
                                className="object-cover w-full h-48 md:h-64"
                            />
                        </div>
                        
                    ))}
                </div>

                {/* modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 flex justify-center items-center z-50" onClick={handleCloseModal}>
                        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full max-w-3xl" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 bg-red-500 w-8 h-8 flex justify-center items-center text-white rounded-full p-2 hover:bg-red-600 focus:outline-none"
                            >
                                &times;
                            </button>
                            <ImageDetail image={selectedImage} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
