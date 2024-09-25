"use client";

import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Image from 'next/image';
import { Bookmark, Download } from 'lucide-react';
import ShareItems from './ShareItems';
import { saveAs } from 'file-saver';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function ImageDialog({
  title,
  tags,
  image,
  open,
  setOpen,
  id
}: {
  title: string;
  tags: string;
  image: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id:number;
}) {

  const { data: session } = useSession();
  const user = session?.user;

  // Function to bookmark the image
  const bookmarkImage = async () => {
    if (!user) {
      toast.error("You need to be logged in to bookmark images.");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: id, 
          webformatURL: image,
          largeImageURL: image,
          uploader: user.name || "Unknown", // Use session user's name
          tags: tags,
        }),
      });

      if (response.ok) {
        const bookmarkedImage = await response.json();
        toast.success("Image bookmarked successfully!");
      } else {
        const errorResponse = await response.json();
        toast.error(`Failed to bookmark the image: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error bookmarking the image:", error);
      toast.error("Something went wrong while bookmarking.");
    }
  };

  // Function to download the image
  const downloadImage = () => {
    saveAs(image, `${title}.jpg`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <Image src={image} alt={title} width={500} height={500} className='object-contain' />
            <p className='text-[14px] text-gray-400 mt-4'>{tags}</p>
            <div className='flex px-4 mt-6 bg-gray-300 rounded-lg text-black py-2 justify-evenly w-full'>
              <ShareItems image={image} />
              <Bookmark onClick={bookmarkImage} className='cursor-pointer' />
              <Download onClick={downloadImage} className='cursor-pointer' />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
