"use client"
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import DarkModeSwitch from './DarkModeSwitch';
import NavbarItems from './NavbarItems';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; 

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
    return (
        <div className={`w-full fixed z-40 flex justify-between items-center p-3 mx-auto ${isScrolled ? 'bg-black bg-opacity-80 transition-colors duration-300' : 'bg-transparent transition-colors duration-300'}`}>
          <div>
          <Link href={'/'} className='flex gap-1 items-center'>
                <div className='font-bold rounded-lg flex'>
                    <span className='ml-1 text-green-600 font-bold text-4xl italic transform -skew-x-10 inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                        M
                    </span>
                    <span className='text-2xl text-amber-600 py-1 mr-1'>
                        Film
                    </span>
                </div>
            </Link>
          </div>
          <div className='flex-1 flex justify-center gap-10 text-white'>
            <NavbarItems title='Home' param='home'/>
            <NavbarItems title='My list' param='mylist' />
            <NavbarItems title='New & Popular' param='new-popular' />
            <NavbarItems title='Movies' param='movie' />
            <NavbarItems title='Anime' param='anime' />
            <NavbarItems title='About' param='about' />
          
          </div>
          <div className='flex items-center gap-4 mr-5 text-white'>
            <form onSubmit={handleSubmit} className='inline-flex justify-left p-1 bg-gray-300 border rounded-lg ml-4'>
              {isSearchVisible && ( 
                <input 
                  type='text' 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder='Search...' 
                  className='ml-2 bg-transparent text-black focus:outline-none'
                  autoFocus
                />
              )}
              <button type="button" onClick={() => setIsSearchVisible(!isSearchVisible)} className='text-black'>
                <BsSearch size={20} />
              </button>
            </form>
            <DarkModeSwitch />
            <IoIosNotificationsOutline className="text-2xl"/>
            <Link href="/login">
                <RxAvatar className="text-2xl"/>
            </Link>
          </div>  
        </div>
    )
}
 