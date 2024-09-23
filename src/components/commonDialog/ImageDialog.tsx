"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { Bookmark, Download, Share, Share2 } from 'lucide-react'
import ShareItems from './ShareItems'
import { saveAs } from 'file-saver';
  

export default function ImageDialog({title, tags,  image, open, setOpen}:{title:string, tags:string, image:string, open:boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

     const downloadImage = () => {
        saveAs(image, `${title}.jpg`); 
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-zinc-950'>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
            <Image  src={image} alt={title} width={500} height={500} className='object-contain'/>
            <p className='text-[14px] text-gray-400 mt-4'>{tags}</p>
            <div className='flex px-4 mt-6 bg-gray-300 rounded-lg text-black py-2 justify-evenly w-full'>
                <ShareItems image={image}/>
                <Bookmark className='cursor-pointer'/>
                <Download onClick={downloadImage} className='cursor-pointer'/>
            </div>
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  
  )
}
