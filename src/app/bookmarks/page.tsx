'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

import { toast } from 'sonner';
import ImageDialog from '@/components/commonDialog/ImageDialog';
import { MinusCircleIcon } from 'lucide-react';

export default function BookmarkedImages() {
    const [bookmarkedImages, setBookmarkedImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    const fetchBookmarkedImages = async () => {
        try {
            const response = await fetch('/api/bookmarks');
            if (!response.ok) {
                throw new Error('Failed to fetch bookmarked images');
            }
            const data = await response.json();
            setBookmarkedImages(data);
        } catch (error) {
            console.error("Failed to load bookmarked images:", error);
            toast.error("Failed to load bookmarked images.");
        } finally {
            setLoading(false);
        }
    };

    const deleteBookmarkImage = async (imageId: string) => {
        try {
            const response = await fetch(`/api/bookmarks`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete bookmarked image');
            }

            const result = await response.json();
            toast.success(result.message);

            setBookmarkedImages((prev) => prev.filter(image => image.id !== imageId));
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            toast.error("Failed to delete bookmark.");
        }
    };

    useEffect(() => {
        fetchBookmarkedImages();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    if (bookmarkedImages.length === 0) return <div className="flex justify-center items-center h-screen"><p>No bookmarked images found.</p></div>;

    return (
        <div id='bookmarked-images' className="min-h-screen w-full">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className='text-center mb-6 md:mb-14 text-2xl md:text-5xl px-4'>Bookmarked Images 🎉</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-8 px-4">
                    {open && selectedImage && (
                        <Suspense fallback={<p>...Loading</p>}>
                            <ImageDialog
                                id={selectedImage.id}
                                open={open}
                                setOpen={setOpen}
                                image={selectedImage.webformatURL}
                                tags={selectedImage.tags}
                                title={selectedImage.uploader} 
                            />
                        </Suspense>
                    )}

                    {bookmarkedImages.map((image) => (
                        <Card key={image.id} onClick={() => { setOpen(true); setSelectedImage(image); }}>
                            <CardHeader>
                                <MinusCircleIcon 
                                    className='text-red-500 cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the card's onClick
                                        deleteBookmarkImage(image.id); // Call delete function
                                    }}
                                />
                            </CardHeader>
                            <CardContent>
                                <Image src={image.webformatURL} alt={image.uploader} width={500} height={500} className='object-contain' />
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
