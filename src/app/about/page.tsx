import Image from "next/image";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 p-8">
      <h1 className="text-2xl font-medium text-amber-600">About MFilm</h1>
      <p>
        Welcome to MFilm, your go-to destination for all things cinema! We are passionate about bringing the magic of movies to your fingertips.
      </p>
      <p>
        Our mission is to provide a comprehensive and user-friendly platform for movie enthusiasts to explore, discover, and learn about films from all genres and eras.
      </p>
      <p>
        Key features of MFilm include:
      </p>
      <ul className="list-disc ml-6">
        <li>Extensive movie database with detailed information</li>
        <li>User reviews and ratings</li>
        <li>Personalized movie recommendations</li>
        <li>Latest news and updates from the world of cinema</li>
      </ul>
      <p>
        Whether you're a casual viewer or a die-hard cinephile, MFilm is here to enhance your movie-watching experience. Dive in and explore the wonderful world of cinema with us!
      </p>
    </div>
  );
}
