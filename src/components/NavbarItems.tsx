'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarItems({title, param} : {title: string, param: string}) {
    const pathName = usePathname();
    const isActive = pathName === `/${param}` || (title === 'Home' && pathName === "/");

    return(
        <div>
           <Link className={`hover:text-amber-600 font-semibold ${
               isActive
                ? 'underline underline-offset-8 decoration-4 decoration-black dark:decoration-green-500 rounded-lg'
                : ''
           }`} href={title === 'Home' ? '/' : `/${param}`}>
                {title}
           </Link>
        </div>
    )
}