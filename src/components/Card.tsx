import Image from "next/image";
import { FaRegImage, FaPlay } from "react-icons/fa";
// import { useRouter } from 'next/navigation';

interface CardProps {
  result: {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    poster_path?: string;
    overview: string;
  };
}

export default function Card({ result }: CardProps) {
  // const router = useRouter();
  const imagePath = result.backdrop_path || result.poster_path;

  // const handleClick = () => {
  //   localStorage.setItem('movieData', JSON.stringify(result));
  //   router.push(`/movie/${result.id}`);
  // };

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-125 transform z-10 hover:z-50 group">
      <div className="cursor-pointer">
        <div className="relative w-full pb-[70%]">
          {imagePath ? (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                alt={result.title || result.name || "Media poster"}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 flex items-end justify-between p-4">
                <h3 className="text-white text-lg font-bold truncate">
                  {result.title || result.name}
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
