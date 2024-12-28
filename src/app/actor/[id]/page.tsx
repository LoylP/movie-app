'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getActorDetails } from '@/api/actor';
import Link from 'next/link';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-700 ${className}`} />
);

const ActorPage = () => {
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getActor = async () => {
      const [actor, actor_movies] = await getActorDetails(id);
      setActor(actor[0]);
      setMovies(actor_movies);
      setLoading(false);
    };

    getActor();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      {/* Header Section */}
      <div className="relative">
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
            alt={actor.name}
            width={1920}
            height={1080}
            className="h-64 w-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 flex items-center px-10">
          <div className="flex items-start gap-5">
            {loading ? (
              <Skeleton className="w-36 h-48 rounded-lg" />
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                width={150}
                height={200}
                className="rounded-lg shadow-md"
              />
            )}
            <div>
              {loading ? (
                <>
                  <Skeleton className="w-48 h-8 mb-2" />
                  <Skeleton className="w-32 h-4 mb-2" />
                  <Skeleton className="w-24 h-4" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold">{actor.name}</h1>
                  <p className="mt-2 text-sm uppercase text-gray-400">
                    {actor.known_for_department}
                  </p>
                  <p className="mt-2 text-gray-300">
                    Popularity: {actor.popularity?.toFixed(1)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="px-10 py-8">
        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                >
                  <Skeleton className="w-full h-64" />
                  <div className="p-4">
                    <Skeleton className="w-32 h-6 mb-2" />
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-28 h-4 mb-2" />
                    <Skeleton className="w-full h-4 mb-2" />
                  </div>
                </div>
              ))
            : movies.map(({ character, movies }) => (
                <Link
                  href={`/movie/${movies.movie_id}`}
                  key={movies.movie_id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                    alt={movies.title}
                    width={500}
                    height={750}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{movies.title}</h3>
                    <p className="text-sm text-gray-400">Character: {character}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Rating: {movies.vote_average} | Votes: {movies.vote_count}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Release Date: {movies.release_date}
                    </p>
                    <p className="text-sm mt-3 text-gray-300">
                      {movies.overview.slice(0, 120)}...
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
