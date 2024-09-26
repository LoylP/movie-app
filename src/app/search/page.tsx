"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

// const ACCESS_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGZlZWMzMzNkZTkzMzM4MDgzZDE5ZjZiYzEzMjlkZiIsIm5iZiI6MTcyNjAzNjcyOS40NTQ1NzcsInN1YiI6IjY2ZGZlYTM4N2IxNDJlNDJmOTI4ZGM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jjqpzQohpdJ6ltPgNjWkG0of8ySoCFQAL8UnxhnNwUg";
const API_KEY = "ddfeec333de93338083d19f6bc1329df";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query!)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${ACCESS_TOKEN}`,
        //     accept: "application/json",
        //   },
        // }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, [query]); 

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-[20%] h-[20%]">
        <h1 className="dark:text-zinc-900 text-zinc-900 font-bold mb-4 lg:text-white">
          .
        </h1>
      </div>
      <h1 className="text-2xl mt-20 font-bold mb-4">
        Search Results for &ldquo;{query}&rdquo;
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 gap-y-16">
        {results.map((movie) => (
          <Card key={movie.id} result={movie} />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        No results found for &ldquo;{query}&rdquo;
      </p>
    </div>
  );
}
