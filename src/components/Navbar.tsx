"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarItems from './NavbarItems';
import {BsSearch} from 'react-icons/bs'
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='flex dark:bg-slate-800 p-4 lg:bg-amber-500 justify-center gap-10'>
        <form onSubmit={handleSubmit} className='mr-auto flex justify-left p-1 bg-gray-300 border rounded-lg'>
            <input
                className='ml-2 bg-transparent text-black focus:outline-none'
                type='text'
                placeholder='Search movie'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className='text-black'>
                <BsSearch size={20} />
            </button>
        </form>
        <NavbarItems title='Trending' param='trending' />
        <NavbarItems title='Movies' param='movie' />
        <NavbarItems title='TV Shows' param='tv' />
        <div className='flex text-2xl ml-auto'>
            <IoIosNotificationsOutline className='mx-2'/>
            <RxAvatar className='mr-5'/>
        </div>
      </div>
  );
}