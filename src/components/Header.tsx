"use client"
import Link from 'next/link';
import MenuItem from './MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
    return (
        <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
          <div className='flex gap-4'>
            <MenuItem title='home' address='/' Icon={AiFillHome} />
            <MenuItem title='about' address='/about' Icon={BsFillInfoCircleFill} />
          </div>
          <div className='flex items-center gap-4'>
            <DarkModeSwitch />
            <Link href={'/'} className='flex gap-1 items-center'>
                <div className='font-bold bg-blue-500 rounded-lg flex'>
                    <span className='ml-1 text-green-600 font-bold text-3xl italic transform -skew-x-10 inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                        M
                    </span>
                    <span className='text-xl py-1 mr-1'>
                        Film
                    </span>
                </div>
            </Link>
          </div>
        </div>
    )
}
 