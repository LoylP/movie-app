'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  number_of_seasons?: number;
}

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('movieData');
    if (storedData) {
      setMovie(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetchMovieDetails();
    }

    // Cleanup
    return () => {
      localStorage.removeItem('movieData');
    };
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'accept': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className='w-full'>
      <div className='p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
        <div className='relative w-full md:w-1/2 aspect-[2/3]'>
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path || movie.backdrop_path}`}
            alt={movie.title || movie.name || ""}
            layout="fill"
            objectFit="cover"
            className='rounded-lg'
          />
        </div>
        <div className='p-2 md:w-1/2'>
          <h2 className='text-2xl mb-3 font-bold'>{movie.title || movie.name}</h2>
          <p className='text-lg mb-3'>{movie.overview}</p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Rating:</span>
            {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
          </p>
          {movie.runtime && (
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Runtime:</span>
              {movie.runtime} minutes
            </p>
          )}
          {movie.number_of_seasons && (
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Seasons:</span>
              {movie.number_of_seasons}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
