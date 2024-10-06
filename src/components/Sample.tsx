import React from 'react';
import sampleData from '../../public/data.json';
import MovieRow from './MovieRow'; 

export default function Sample() {
  const animeMovies = sampleData.results.filter(movie => movie.kind === "Anime");
  const superheroMovies = sampleData.results.filter(movie => movie.kind?.includes("Marvel") || movie.kind?.includes("Superhero"));
  const Action = sampleData.results.filter(movie => movie.kind === "Action");
  const Horror = sampleData.results.filter(movie => movie.kind === "Horror");
  const HarryPotter = sampleData.results.filter(movie => movie.kind === "Harry Potter Series");

  return (
    <div className="container px-4 mx-auto">
      <MovieRow movies={animeMovies} title="Anime Movies" />
      <MovieRow movies={superheroMovies} title="Marvel, Superhero" />
      <MovieRow movies={Action} title="Action Movies" />
      <MovieRow movies={HarryPotter} title="HarryPotter" />
      <MovieRow movies={Horror} title="Horror" />
    </div>
  );
}