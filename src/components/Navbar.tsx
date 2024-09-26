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
    <div className='w-full fixed z-40 flex p-4 items-center'>
        <div className='flex-1'>
            <form onSubmit={handleSubmit} className='inline-flex justify-left p-1 bg-gray-300 border rounded-lg ml-4'>
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
        </div>
        <div className='flex-1 flex justify-center gap-10'>
            <NavbarItems title='My list' param='mylist' />
            <NavbarItems title='Trending' param='trending' />
            <NavbarItems title='Movies' param='movie' />
            <NavbarItems title='TV Shows' param='tv' />
  
        </div>
        <div className='flex-1 flex justify-end text-2xl mr-4'>
            <IoIosNotificationsOutline className='mx-2'/>
            <RxAvatar className='ml-2'/>
        </div>
    </div>
  );
}