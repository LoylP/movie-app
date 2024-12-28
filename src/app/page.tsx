'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Sample from "@/components/Sample";
import Billboard from "@/components/Billboard";
import Anime from "@/components/Anime";
import Movie from "@/components/Movie";
import MyListPage from "./mylist/page";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "home";

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        let url = "";
        switch (genre) {
          case "tv":
            url =
              "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
            break;
          case "trending":
            url =
              "https://api.themoviedb.org/3/trending/all/day?language=en-US";
            break;
          default:
            url =
              "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching media:", error);
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

  if (genre === "mylist") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MyListPage/>
      </div>
    );
  }

  if (genre === "movie") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Movie />
      </div>
    );
  }

  if (genre === "anime") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Anime />
      </div>
    );
  }

  return (
    <div>
      <Billboard />
      <Sample />
    </div>
  );
}
