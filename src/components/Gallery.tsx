'use client';

import { fetchImages, Images } from '@/helper';
import React, { Suspense, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import ImageDialog from './commonDialog/ImageDialog';

export default function Gallery({ query }: { query: string }) {
    const [imgs, setImgs] = useState<Images[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Images | null>(null);

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

    if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    if (imgs.length === 0 && !loading) return <div className="flex justify-center items-center h-screen"><p>No images found.</p></div>;

    return (
        <div id='gallery' className="min-h-screen w-full">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className='text-center mb-6 md:mb-14 text-2xl md:text-5xl'>Images🎉</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-8 px-4">
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
                        <Card key={image.id} onClick={() => { setOpen(true); setSelectedImage(image); }}>
                            <CardHeader>
                                <CardTitle>{image.user}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image src={image.webformatURL} alt={image.user} width={500} height={500} className='object-contain' />
                            </CardContent>
                            <CardFooter>
                                <p className='text-[14px] text-gray-400'>{image.tags}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
