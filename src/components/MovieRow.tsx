import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from './MovieCard'; 

interface MovieItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview: string;
  kind?: string;
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
      <h2 className="text-xl font-bold my-4">{title}</h2>
      <div className="relative">
        <button
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('left')}
          style={{ height: '100%', width: '50px' }} 
        >
          <FaChevronLeft />
        </button>
        <div className="overflow-x-hidden">
          <div
            ref={rowRef}
            className="flex space-x-4 pb-3 overflow-x-scroll scrollbar-hide"
            style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map(movie => (
              <div key={movie.id} className="flex-none w-56">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('right')}
          style={{ height: '100%', width: '50px' }} 
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MovieRow;