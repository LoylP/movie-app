export default function Page() {
  return (
    <div className="max-w-6xl text-lg mx-auto space-y-4 p-8">
        <div className="flex text-4xl font-medium my-auto">
            <h1 className="text-amber-600">About </h1>
            <div className='flex my-auto'>
                <span className='ml-1 text-green-600 font-bold italic transform -skew-x-10 inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                    M
                </span>
                <span className=' mr-1'>
                    Film                   
                </span>
            </div>
        </div>
      
      <p>
        Welcome to MFilm, your go-to destination for all things cinema! We are passionate about bringing the magic of movies to your fingertips.
      </p>
      <p>
        Our mission is to provide a comprehensive and user-friendly platform for movie enthusiasts to explore, discover, and learn about films from all genres and eras.
      </p>
      <p>
        Key features of MFilm include:
      </p>
      <ul className="list-disc text-md text-orange-300 ml-6">
        <li>Extensive movie database with detailed information</li>
        <li>User reviews and ratings</li>
        <li>Personalized movie recommendations</li>
        <li>Latest news and updates from the world of cinema</li>
      </ul>
      <p>
        Whether you are a casual viewer or a die-hard cinephile, MFilm is here to enhance your movie-watching experience. Dive in and explore the wonderful world of cinema with us!
      </p>
    </div>
  );
}
