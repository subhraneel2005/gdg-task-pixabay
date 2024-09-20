'use client'

import { fetchImages, Image } from '@/helper'
import React, { useEffect, useState } from 'react'
import ImageDetail from './ImageDetail'; 

export default function Gallery({ query }: { query: string }) {

    const [imgs, setImgs] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
        }
        loadImages();
    }, [query]);

    if (loading) return <p>Loading...</p>;

    if (imgs.length === 0 && !loading) return <p>No images found.</p>;

    const handleImageClick = (image: Image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {imgs.map((image) => (
                    <div
                        key={image.id}
                        className="cursor-pointer"
                        onClick={() => handleImageClick(image)}
                    >
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-auto rounded shadow"
                        />
                    </div>
                ))}
            </div>

            {/* Modal for Image Detail */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
                        <ImageDetail image={selectedImage} />
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
