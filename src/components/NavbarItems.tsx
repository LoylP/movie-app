'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NavbarItems({title, param} : {title: string, param: string}) {
    const searchParams = useSearchParams();
    const genre = searchParams.get('genre');
    return(
        <div>
           <Link className={`hover:text-amber-600 font-semibold ${
               genre === param || (genre === null && param === 'movie')
                ? 'underline underline-offset-8 decoration-4 decoration-black dark:decoration-green-500 rounded-lg'
                : ''
           }`} href={`/?genre=${param}`}>
                {title}
           </Link>
        </div>
    )
}