'use client';
import { useEffect, useState } from 'react';
import {getAllGenres} from '@/api/genre';
import Link from 'next/link';

export default function GenresPage() {
  const [genres, setGenres] = useState([]);

  // Call API to get all genres
  useEffect(() => {
    const getGenres = async () => {
      const genres = await getAllGenres();
      setGenres(genres);
    };
    getGenres();
  },[]);

  return (
    <div className="pt-16 min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Explore Genres</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link key={genre.genre_id} href={`/genre/${genre.name}/${genre.genre_id}`}>
              <h1
                className="block bg-gray-800 hover:bg-red-600 transition-colors duration-300 rounded-lg p-4 text-center text-lg font-semibold shadow-md"
              >
                {genre.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
