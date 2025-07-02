import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MoviesList = ({ movies }) => (
  <div className="movies-grid">
    {movies.map(movie => {
      // Формируем полный URL изображения
      const imageUrl = movie.img 
        ? `https://shift-intensive.ru/api/${movie.img}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

      return (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.name}
          originalTitle={movie.originalName}
          releaseDate={movie.releaseDate}
          actors={movie.actors}
          directors={movie.directors}
          runtime={movie.runtime}
          ageRating={movie.ageRating}
          genres={movie.genres}
          ratings={movie.userRatings}
          imageUrl={imageUrl} 
          country={movie.country?.name}
        />
      );
    })}
  </div>
);

export default MoviesList;