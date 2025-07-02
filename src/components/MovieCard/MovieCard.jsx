import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({
  id, // Получаем id напрямую из пропсов
  title,
  originalTitle,
  description,
  releaseDate,
  imageUrl,
  genres = [],
  runtime,
  ageRating,
  ratings = {},
  country
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`); // Используем id из пропсов
  };

  const fullImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `https://shift-intensive.ru${imageUrl}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={fullImageUrl}
        alt={title}
        className="movie-poster"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        {originalTitle && originalTitle !== title && (
          <p className="original-title">{originalTitle}</p>
        )}
        <p className="release-date">{releaseDate} • {country}</p>
        {genres.length > 0 && (
          <div className="genres">
            {genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        )}
        <p className="movie-meta">{runtime} мин • {ageRating}</p>
        {(ratings.kinopoisk || ratings.imdb) && (
          <div className="ratings">
            {ratings.kinopoisk && <span>Кинопоиск: {ratings.kinopoisk}</span>}
            {ratings.imdb && <span>IMDb: {ratings.imdb}</span>}
          </div>
        )}
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export default MovieCard;