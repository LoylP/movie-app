import React, { useState } from 'react'
// import useBillboard from '@/hook/useBillboard';
import databanner from '../../public/billboard.json';
import { GoUnmute, GoMute  } from "react-icons/go";

interface Props {
    id: number,
    title: string,
    description: string,
    videoUrl: string,
    thumbnail: string,
    genre: string,
    duration: string
}

const Billboard = () => {
    const [currentBanner, setCurrentBanner] = useState(databanner[0]);
    console.log(currentBanner);
    const [isMuted, setIsMuted] = React.useState(true); 

    const toggleMute = () => { 
        setIsMuted(prev => !prev);
    };

    const handleBannerChange = (banner: Props) => {
        setCurrentBanner(banner);
    };

    return (
        <div className='relative h-[56.25vw]'>
            <video
                className='w-full h-[56.25vw] object-cover brightness-[60%]'
                autoPlay
                muted={isMuted} 
                loop
                poster={currentBanner?.thumbnail}
                src={currentBanner?.videoUrl}
            ></video>
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
        
            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {currentBanner?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[80%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {currentBanner?.description}
                </p>
                <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
                    <button className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition'>
                        More Info
                    </button>
                    <button className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition' onClick={toggleMute}> {/* {{ edit_4 }} */}
                        {isMuted ? <GoUnmute /> : <GoMute />} 
                    </button>
                </div>
            </div>
            <div className='absolute top-[30%] md:top-[30%] right-4 md:right-16 p-4 rounded-md shadow-lg hidden md:block'>
                <div className='flex flex-col items-center gap-3'>
                    <div className='flex flex-row gap-2 justify-center'>
                        {databanner.map((banner, index) => {
                            const isSelected = currentBanner === banner;
                            const isAdjacent = 
                                currentBanner === databanner[index - 1] || 
                                currentBanner === databanner[index + 1];
                            return (
                                <img 
                                    key={index}
                                    src={banner.thumbnail} 
                                    alt={`Thumbnail ${index}`} 
                                    className={`transition-transform duration-300 ease-in-out ${isSelected ? 'w-40 h-44 scale-110' : isAdjacent ? 'w-36 h-36 scale-90 opacity-50' : 'hidden'} object-cover rounded-md cursor-pointer`} 
                                    onClick={() => handleBannerChange(banner)} 
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard