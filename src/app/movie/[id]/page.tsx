"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { FaPlay, FaHeart } from "react-icons/fa6";
import sampleData from "public/data.json";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
  const [favourites, setFavourites] = useState<MovieDetails[]>([]);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const sampleMovie = sampleData.results.find(
        (m) => m.id.toString() === id
      );
      if (sampleMovie) {
        setMovie(sampleMovie as MovieDetails);
      } else {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const storedData = localStorage.getItem("movieData");
    if (storedData) {
      setMovie(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetchMovieDetails();
    }

    // Load favourites from localStorage
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }

    return () => {
      localStorage.removeItem("movieData");
    };
  }, [fetchMovieDetails]);

  const handleAddToFavourite = () => {
    if (!movie) return;

    const isFavourite = favourites.some((favourite) => favourite.id === movie.id);
    let updatedFavourites;

    if (isFavourite) {
      // Remove from favourites
      updatedFavourites = favourites.filter((favourite) => favourite.id !== movie.id);
    } else {
      // Add to favourites
      updatedFavourites = [...favourites, movie];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
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

  const isFavourite = favourites.some((favourite) => favourite.id === movie.id);

  return (
    <div className="relative w-full min-h-screen text-black dark:text-gray-200">
      {/* Background Image */}
      <div className="w-[20%] h-[20%]">
        <h1 className="dark:text-zinc-900 text-zinc-900 font-bold mb-4 lg:text-white">
          .
        </h1>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name || ""}
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:pt-8 flex flex-col md:flex-row max-w-6xl mx-auto md:space-x-6">
        <div className="relative w-full md:w-1/3 aspect-[2/3] shadow-2xl">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path || movie.backdrop_path}`}
            alt={movie.title || movie.name || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="p-3 md:w-2/3">
          <h1 className="text-6xl mb-10 font-bold subpixel-antialiased text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600 drop-shadow-lg">
            {movie.title || movie.name}
          </h1>
          <p className="text-xl mb-5">{movie.overview}</p>
          <div className="flex mb-5">
            <button className="flex items-center justify-center gap-2 text-2xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
              Play now <FaPlay className="text-xl" />
            </button>
            <button className="mx-5 flex items-center justify-center gap-2 text-2xl hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 border-2 border-white">
              Trailer
            </button>
          </div>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
          </p>
          {movie.runtime && (
            <p className="mb-3">
              <span className="font-semibold mr-1">Runtime:</span>
              {movie.runtime} minutes
            </p>
          )}
          {movie.number_of_seasons && (
            <p className="mb-3">
              <span className="font-semibold mr-1">Seasons:</span>
              {movie.number_of_seasons}
            </p>
          )}
          {/* Favourite Button */}
          <button
            onClick={handleAddToFavourite}
            className="flex items-center gap-2 text-xl mt-4 py-2 px-4 rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <FaHeart className={`${isFavourite ? "text-red-600" : "text-gray-500"}`} />
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
}
