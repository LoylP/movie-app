import React, { useRef } from 'react';
import Image from "next/image";
import { FaRegImage, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import sampleData from '../../public/data.json';
import { useRouter } from "next/navigation";

interface MovieItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview: string;
  kind?: string;
}

function MovieCard({ movie }: { movie: MovieItem }) {
  const router = useRouter();
  const imagePath = movie.backdrop_path || movie.poster_path;

  const handleClick = () => {
    // Lưu dữ liệu phim vào localStorage
    localStorage.setItem("movieData", JSON.stringify(movie));
    // Chuyển hướng đến trang chi tiết phim
    router.push(`/movie/${movie.id}`);
  };

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-125 transform z-10 hover:z-50 group">
      <div onClick={handleClick} className="cursor-pointer">
        <div className="relative w-full pb-[70%]">
          {imagePath ? (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                alt={movie.title || movie.name || "Media poster"}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 flex items-end justify-between p-4">
                <h3 className="text-white text-lg font-bold truncate">
                  {movie.title || movie.name}
                </h3>
                <button className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaPlay />
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
              <FaRegImage className="text-gray-500 text-4xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MovieRow({ movies, title }: { movies: MovieItem[], title: string }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold my-4">{title}</h2>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -left-16"
          onClick={() => scroll('left')}
        >
          <FaChevronLeft />
        </button>
        <div className="overflow-x-hidden">
          <div
            ref={rowRef}
            className="flex space-x-4 pb-4 overflow-x-scroll scrollbar-hide"
            style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map(movie => (
              <div key={movie.id} className="flex-none w-72">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -right-16"
          onClick={() => scroll('right')}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default function Sample() {
  const animeMovies = sampleData.results.filter(movie => movie.kind === "Anime");
  const superheroMovies = sampleData.results.filter(movie => movie.kind?.includes("Marvel") || movie.kind?.includes("Superhero"));
  const Action = sampleData.results.filter(movie => movie.kind === "Action");
  const Horror = sampleData.results.filter(movie => movie.kind === "Horror");
  const HarryPotter = sampleData.results.filter(movie => movie.kind === "Harry Potter Series");

  return (
    <div className="container mx-auto px-4">
      <MovieRow movies={animeMovies} title="Anime Movies" />
      <MovieRow movies={superheroMovies} title="Marvel, Superhero" />
      <MovieRow movies={Action} title="Action Movies" />
      <MovieRow movies={HarryPotter} title="HarryPotter" />
      <MovieRow movies={Horror} title="Horror" />
    </div>
  );
}