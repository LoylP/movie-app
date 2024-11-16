"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
};

const MyListPage = () => {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  // Remove a video from the favourites list
  const removeFromFavourites = (movieId: number) => {
    const updatedFavourites = favourites.filter((movie) => movie.id !== movieId);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (favourites.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">No favorite list yet</h1>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      <div className="max-w-6xl text-lg mx-auto space-y-4 p-8">
        <div className="flex text-4xl font-medium my-auto my-10">
          <h1>Your Favourite Videos</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out scale-100"
              onClick={() => router.push(`/movie/${movie.id}`)} // Navigate to movie details page
            >
              <div className="relative h-60 w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name || "Movie Poster"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{movie.title || movie.name}</h2>
                <div className="flex justify-between items-center mt-4">
                  <button className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                    <FaPlay className="text-xl" />
                    Play
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-white font-bold py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from triggering navigation
                      removeFromFavourites(movie.id); // Remove from favourites
                    }}
                  >
                    <FaHeart className="text-xl" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListPage;
