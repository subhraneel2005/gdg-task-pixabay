import React from 'react';
import { FaLinkedin, FaTwitter, FaLink, FaGithub } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className='top-5 left-5 flex gap-5 md:px-0 px-4 md:py-5 py-3 ml-5'>
      <h3 className='text-[16px] text-gray-300'>Built by Subhraneel</h3>
      <div className='flex gap-3'>
        <a href='https://www.linkedin.com/in/subhraneel-goswami-599931282/' aria-label='LinkedIn' target='_blank'>
          <FaLinkedin size={25} className='cursor-pointer text-blue-600 flex justify-center items-center' />
        </a>
        <a href='https://x.com/Subhraneel55545' aria-label='Twitter' target='_blank'>
          <FaTwitter size={25} className='cursor-pointer text-zinc-200 flex justify-center items-center' />
        </a>
        <a href='https://github.com/subhraneel2005' aria-label='Github' target='_blank'>
          <FaGithub size={25}  className='cursor-pointer flex justify-center items-center'/>
        </a>
        <a href='https://drive.google.com/file/d/1PHU4wZx443UTjJE_xhBuV6KAS08TsXBe/view?usp=sharing' aria-label='Link' target='_blank'>
          <FaLink size={25}  className='cursor-pointer text-red-800 flex justify-center items-center'/>
        </a>
      </div>
    </nav>
  );
}
