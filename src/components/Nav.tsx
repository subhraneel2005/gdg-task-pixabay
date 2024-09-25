'use client'

import React from 'react';
import { FaLinkedin, FaTwitter, FaLink, FaGithub } from "react-icons/fa";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './commonDialog/ModeToggle';


export default function Nav() {

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <nav className='top-5 left-5 flex justify-between  md:px-6 px-4 md:py-5 py-3 ml-5'>
      <div className='md:flex block gap-5'>
      <h3 className='md:text-[16px] text-[13px]'>Built by Subhraneel</h3>
      <div className='flex gap-3'>
        <a href='https://www.linkedin.com/in/subhraneel-goswami-599931282/' aria-label='LinkedIn' target='_blank'>
          <FaLinkedin size={20} className='cursor-pointer text-blue-600 flex justify-center items-center' />
        </a>
        <a href='https://x.com/Subhraneel55545' aria-label='Twitter' target='_blank'>
          <FaTwitter size={20} className='cursor-pointer text-sky-500 flex justify-center items-center' />
        </a>
        <a href='https://github.com/subhraneel2005' aria-label='Github' target='_blank'>
          <FaGithub size={20}  className='cursor-pointer flex justify-center items-center'/>
        </a>
        <a href='https://drive.google.com/file/d/1PHU4wZx443UTjJE_xhBuV6KAS08TsXBe/view?usp=sharing' aria-label='Link' target='_blank'>
          <FaLink size={20}  className='cursor-pointer text-red-800 flex justify-center items-center'/>
        </a>
      </div>
      </div>

      <div className='flex gap-5'>
          
          {session ?
          (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.image!} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='p-4'>
                <DropdownMenuItem>
                  <Button onClick={() => router.push('/bookmarks')} variant='outline'>My Bookmarks</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={() => signOut()} variant='outline'>Sign Out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ):
          (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}

          <ModeToggle/>
      </div>
    </nav>
  );
}
