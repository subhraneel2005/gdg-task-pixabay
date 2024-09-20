import React from 'react';
import { Image } from '@/helper';

interface ImageDetailProps {
  image: Image | null;
}

export default function ImageDetail({ image }: ImageDetailProps) {
  if (!image) return null;

  return (
    <div className="p-4">
      <img src={image.largeImageURL} alt={image.tags} className="w-full h-auto rounded shadow" />
      <h2 className="text-xl mt-4">{image.user}</h2>
      <p>{image.tags}</p>
    </div>
  );
}
