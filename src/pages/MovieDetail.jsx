import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchMovieTime } from '../api/api';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [expandedDate, setExpandedDate] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadSchedules = async () => {
      try {
        const data = await fetchMovieTime(id);
        if (Array.isArray(data.schedules)) {
          setSchedules(data.schedules);
        } else if (data.schedules) {
          setSchedules([data.schedules]);
        }
      } catch (error) {
        console.error('Error loading schedules:', error);
      } finally {
        setLoadingSchedules(false);
      }
    };

    loadMovie();
    loadSchedules();
  }, [id]);

  const getImageUrl = () => {
    if (!movie?.img) return 'https://via.placeholder.com/300x450?text=No+Image';
    return movie.img.startsWith('http')
      ? movie.img
      : `https://shift-intensive.ru/api/${movie.img}`;
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  };


  const toggleDate = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const renderPlacesMatrix = (places) => {
    if (!places || !places.length) return <p>Нет данных о местах</p>;

    return (
      <div className="places-matrix">
        {places.map((row, rowIndex) => (
          <div key={rowIndex} className="places-row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`place ${seat.type?.toLowerCase() || 'unknown'}`}
                onClick={() => console.log(`Выбрано место ${rowIndex}-${seatIndex} за ${seat.price} ₽`)}
              >
                {seat.price} ₽
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка фильма...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-message">
        <h2>Фильм не найден</h2>
        <p>Попробуйте обновить страницу или вернуться позже</p>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="movie-poster-container">
        <img
          src={imageError ? 'https://via.placeholder.com/300x450?text=No+Image' : getImageUrl()}
          alt={movie.name}
          className="movie-poster"
          onError={handleImageError}
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        />
      </div>

      <div className="movie-info">
        <h1 className="movie-title">{movie.name}</h1>
        {movie.originalName && movie.originalName !== movie.name && (
          <p className="original-title">{movie.originalName}</p>
        )}

        <div className="movie-meta">
          <span>{movie.releaseDate}</span>
          <span>{movie.runtime} мин</span>
          <span>{movie.ageRating}</span>
        </div>

        {movie.genres?.length > 0 && (
          <div className="genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        )}

        <div className="movie-description">
          <p>{movie.description}</p>
        </div>

        <div className="schedules-section">
          <h3>Выберите дату и место</h3>

          {loadingSchedules ? (
            <p>Загрузка расписания...</p>
          ) : schedules.length > 0 ? (
            <div className="dates-list">
              {schedules.map((schedule, index) => (
                <div key={index} className="date-item">
                  <div
                    className="date-header"
                    onClick={() => toggleDate(schedule.date)}
                  >
                    <span>{(schedule.date && schedule.date.split('.').slice(0, 2).join('.')) || 'Дата не указана'}</span>
                    <span className="toggle-icon">
                      {expandedDate === schedule.date ? '▲' : '▼'}
                    </span>
                  </div>

                  {expandedDate === schedule.date && (
                    <div className="date-content">
                      {schedule.seances?.length > 0 ? (
                        schedule.seances.map((seance, seanceIndex) => (
                          <div key={seanceIndex} className="seance">
                            <div className="seance-info">
                              <span className="seance-time">{seance.time || '--:--'}</span>
                              <span className="seance-hall">Зал: {seance.hall?.name || 'не указан'}</span>
                            </div>

                            {seance.hall?.places && renderPlacesMatrix(seance.hall.places)}
                          </div>
                        ))
                      ) : (
                        <p>Нет сеансов на эту дату</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Нет доступных расписаний</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;