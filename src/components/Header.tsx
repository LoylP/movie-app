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
import { getCurrentUser } from '@/api/auth';
import { usePathname } from 'next/navigation';
import { FaRegLightbulb } from "react-icons/fa";


export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false); 
  const [user, setUser] = useState('');
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split('/');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // logout
  const handleLogout = () => {
    // Delete the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to /login
    router.push("/login");
  };

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user.username);
      } else {
        setUser("");
      }
      return user
    }
    fetchUser();
  }, [path]);

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
  if (path.length > 3 && path[1] === 'movie' && path[2] === 'watch') {
    return <></>
  }
  if (path[1] === 'register' || path[1] === 'login') {
    return <></>
  }

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
            <NavbarItems title='Genres' param='genre' />
            <NavbarItems title='My list' param='mylist' />
            <NavbarItems title='History' param='history' />
            <NavbarItems title='About' param='about' />
          </div>
          <div className='flex items-center gap-4 mr-5 text-white'>
            {user? (
                <>
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
              <Link href="/recommend">
                <FaRegLightbulb className="text-2xl hover:text-yellow-400"/>
              </Link>
              <DarkModeSwitch />
              <IoIosNotificationsOutline className="text-2xl"/>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                  {/* Avatar */}
                  <div className="cursor-pointer">
                    <RxAvatar className="text-2xl" />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 w-24 bg-white border border-gray-200 rounded-md shadow-lg">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                         onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
              </div>
              </>
            ):(
              <>
              <Link href="/login">
                  <button className='bg-green-500 px-2 py-1 rounded-lg'>Login</button>
              </Link>
              <Link href="/register">
                  <button className='bg-green-500 px-2 py-1 rounded-lg'>Register</button>
              </Link>
              </>
            )}
          </div>  
        </div>
    )
}
 