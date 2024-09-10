import Image from 'next/image';
import React from 'react';
import loading from 'public/loading.gif'

const Loading = () => {
  return (
    <>
      <Image className='w-[200px] m-auto block' src={loading} alt='loading..' width={200} height={200} />
    </>
  );
};

export default Loading;