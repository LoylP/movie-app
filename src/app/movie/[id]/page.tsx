'use client';
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { FaPlay, FaHeart, FaGlobe } from "react-icons/fa6";
import { getMovieDetail } from "@/api/movie";
import Link from 'next/link';
import { addToFavourite, deleteFromFavourite, isFavouriteMoive } from "@/api/auth";

interface Genres_detail {
  genre_id: number;
  name: string;
}

interface Genres {
  genres: Genres_detail;
}

interface Actors_detail {
  actor_id: number;
  gender: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface Actors {
  actors: Actors_detail;
  character: string;
}

interface MovieDetails {
  movie_id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  movie_details: {
    budget: number;
    status: string;
    revenue: number;
    runtime: number;
    tagline: string;
    homepage: string;
    video_url: string;
    spoken_language: string[];
    production_companies: string[];
    production_countries: string[];
  };
  genres: Genres[];
  actors: Actors[];
}
export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const data = await getMovieDetail(id);
      setMovie(data);

      // Check if the movie is a favourite
      const favouriteStatus = await isFavouriteMoive(data.movie_id);
      setIsFavourite(favouriteStatus);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const handleAddToFavourite = async () => {
    if (!movie) return;

    try {
      if (isFavourite) {
        await deleteFromFavourite(movie.movie_id);
        setIsFavourite(false);
      } else {
        await addToFavourite(movie.movie_id);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loading />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-white">Movie not found</div>;
  }

  return (
    <div className="pt-16 relative w-full min-h-screen bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row max-w-7xl mx-auto p-6 lg:p-12">
        {/* Movie Poster */}
        <div className="relative w-full lg:w-1/3 aspect-[2/3] shadow-lg">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="lg:w-2/3 lg:pl-10 mt-6 lg:mt-0">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">
            {movie.title}
          </h1>
          <p className="italic text-gray-400 mb-6">{movie.movie_details.tagline}</p>
          <p className="text-lg leading-relaxed mb-6">{movie.overview}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-3 mb-6">
            {movie.genres.map((genre) => (
              <Link
                href={`/genre/${genre.genres.name}/${genre.genres.genre_id}`}
                key={genre.genres.genre_id}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full text-sm shadow-lg"
              >
                {genre.genres.name}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              href={{
                pathname: `/movie/watch/${movie.movie_id}`,
                query: {
                  video_url: movie.movie_details.video_url,
                  name: movie.title,
                },
              }}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-lg bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
            >
              Play Now <FaPlay />
            </Link>
            <a
              href={movie.movie_details.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-lg border-2 border-white text-white font-semibold py-3 px-6 rounded-xl transition hover:bg-gray-800"
            >
              Official Site <FaGlobe />
            </a>
            {/* Favourites Button */}
            <button
              onClick={handleAddToFavourite}
              className={`flex items-center gap-2 text-lg py-2 px-4 rounded-lg border-2 transition ${
                isFavourite ? "text-red-500 border-red-500" : "text-gray-300 border-gray-500"
              } hover:bg-red-600 hover:text-white`}
            >
              <FaHeart className={isFavourite ? "text-red-500" : "text-gray-400"} />
            </button>
          </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</p>
          <p><strong>Runtime:</strong> {movie.movie_details.runtime} minutes</p>
          <p><strong>Budget:</strong> ${movie.movie_details.budget.toLocaleString()}</p>
          <p><strong>Revenue:</strong> ${movie.movie_details.revenue.toLocaleString()}</p>
          <p><strong>Status:</strong> {movie.movie_details.status}</p>
        </div>
        </div>
    </div>
  
    {/* Actors Section */}
    <div className="relative max-w-7xl mx-auto p-6 lg:p-12">
      <h2 className="text-3xl font-semibold mb-6">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {movie.actors.map((actor) => (
          <Link href={`/actor/${actor.actors.actor_id}`} key={actor.actors.actor_id} className="text-center">
            {actor.actors.profile_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${actor.actors.profile_path}`}
                alt={actor.actors.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-3"
              />
            )}
            <p className="font-medium">{actor.actors.name}</p>
            <p className="text-gray-400 text-sm">{actor.character}</p>
          </Link>
        ))}
      </div>
    </div>
  
    {/* Additional Information */}
    <div className="relative max-w-7xl mx-auto p-6 lg:p-12">
      <h2 className="text-3xl font-semibold mb-6">Additional Information</h2>
      <p><strong>Languages:</strong> {movie.movie_details.spoken_language.join(", ")}</p>
      <p><strong>Production Companies:</strong> {movie.movie_details.production_companies.join(", ")}</p>
      <p><strong>Production Countries:</strong> {movie.movie_details.production_countries.join(", ")}</p>
      </div>
    </div>
  );
}