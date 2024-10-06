import React, { useState } from 'react';
import { GoUnmute, GoMute } from 'react-icons/go';
import anime from '../../public/anime.json';

interface Props {
  id: number;
  kind: string;
  backdrop_path: string;
  original_title: string;
  description: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  videoUrl?: string;
}

const pathAPI = 'http://127.0.0.1:8000/videos/';

const Anime = () => {
  const [currentBanner, setCurrentBanner] = useState(anime[0]);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleBannerChange = (banner: Props) => {
    setCurrentBanner(banner);
  };

  return (
    <div className="relative h-[56.25vw]">
      {currentBanner.videoUrl ? (
        <video
          className="w-full h-[56.25vw] object-cover brightness-[90%]"
          autoPlay
          muted={isMuted}
          loop
          poster={currentBanner?.backdrop_path}
          src={`${pathAPI}${currentBanner.videoUrl}`}
        ></video>
      ) : (
        <img
          className="w-full h-[56.25vw] object-cover brightness-[90%]"
          src={`https://image.tmdb.org/t/p/w1280${currentBanner.backdrop_path}`}
          alt={currentBanner.title}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {currentBanner?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[80%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {currentBanner?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            More Info
          </button>
          <button
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
            onClick={toggleMute}
          >
            {isMuted ? <GoUnmute /> : <GoMute />}
          </button>
        </div>
      </div>

      <div className="absolute top-[30%] md:top-[30%] right-4 md:right-16 p-4 rounded-md shadow-lg hidden md:block">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row gap-2 justify-center">
            {anime.map((banner, index) => {
              const isSelected = currentBanner === banner;
              const isAdjacent =
                currentBanner === anime[index - 1] ||
                currentBanner === anime[index + 1];
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${banner.poster_path || banner.backdrop_path}`}
                  alt={`backdrop_path ${index}`}
                  className={`transition-transform duration-500 ease-in-out ${
                    isSelected
                      ? 'w-44 h-48 scale-110'
                      : isAdjacent
                      ? 'w-40 h-40 scale-95 opacity-75'
                      : 'hidden'
                  } object-cover rounded-md cursor-pointer`}
                  onClick={() => handleBannerChange(banner)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
