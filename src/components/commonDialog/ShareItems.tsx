'use client';

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
  } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Share2 } from 'lucide-react';
import { createShareUrls } from '@/helper';
  

export default function ShareItems({image} : {image:string}) {

    const shareUrls = createShareUrls(image);

    const handleShare = (url: string) => {
        window.open(url, '_blank');
    };


  return (
    <DropdownMenu >
    <DropdownMenuTrigger>
        <Share2 className='cursor-pointer'/>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" align="center">
         <DropdownMenuItem onClick={() => handleShare(shareUrls.twitter)}>Twitter</DropdownMenuItem>
         <DropdownMenuItem onClick={() => handleShare(shareUrls.instagram)}>Instagram</DropdownMenuItem>
         <DropdownMenuItem onClick={() => handleShare(shareUrls.linkedin)}>LinkedIn</DropdownMenuItem>
         <DropdownMenuItem onClick={() => handleShare(shareUrls.facebook)}>Facebook</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>

  )
}
