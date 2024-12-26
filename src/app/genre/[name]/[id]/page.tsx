'use client';
import { useEffect, useState } from 'react';
import { getAllMoviesByGerensID } from '@/api/genre';
import Image from "next/image";
import { usePathname } from 'next/navigation';

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen bg-black">
    <div className="spinner-border animate-spin border-t-2 border-b-2 border-red-600 w-12 h-12 rounded-full"></div>
  </div>
);

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const path = pathName.split('/');

  useEffect(() => {
    const getMovies = async (page = 1) => {
      try {
        setIsLoading(true);
        const response = await getAllMoviesByGerensID(path[3], page);
        setMovies(response.data);
        setTotalPages(response.count);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayed = 5;
    const range = 2;

    if (totalPages <= maxDisplayed) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > range + 1) {
        pageNumbers.push(1, '...');
      }
      for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - range) {
        pageNumbers.push('...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{path[2]}</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.movies.movie_id}
                  className="cursor-pointer group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.movies.poster_path}`}
                    alt={movie.movies.title}
                    width={300}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h2 className="text-base font-bold mb-1">{movie.movies.title}</h2>
                    <p className="text-sm mb-2">{movie.movies.overview.slice(0, 100)}...</p>
                    <p className="text-xs">
                      <strong>Release Date:</strong> {movie.movies.release_date}
                    </p>
                    <p className="text-xs">
                      <strong>Vote Average:</strong> {movie.movies.vote_average}
                    </p>
                    <p className="text-xs">
                      <strong>Popularity:</strong> {movie.movies.popularity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors duration-200"
              >
                Previous
              </button>

              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (page !== '...') {
                      handlePageChange(page);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage
                      ? 'bg-red-600 text-white'
                      : page === '...'
                      ? 'bg-transparent text-gray-500'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors duration-200'
                  }`}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
