'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import Card from '@/components/Card';


interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
}

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Home() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || 'movie';

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        let url = '';
        switch(genre) {
          case 'tv':
            url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
            break;
          case 'trending':
            url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
            break;
          default:
            url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMediaItems(data.results);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [genre]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">
        {genre === 'trending' ? 'Trending' : genre === 'tv' ? 'Popular TV Shows' : 'Popular Movies'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} result={item} />
        ))}
      </div>
    </div>
  );
}