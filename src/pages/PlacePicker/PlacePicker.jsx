import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PlacePicker.css'


const PlacePicker = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const { movie, schedule } = state || {};
  const places = schedule?.hall?.places || [];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/movie/${id}`, { state: { movie } });
  };

  const handlePlaceSelect = (rowIndex, seatIndex) => {
    const placeKey = `${rowIndex}-${seatIndex}`
    setSelectedPlaces(prev =>
      prev.includes(placeKey)
        ? prev.filter(p => p !== placeKey)
        : [...prev, placeKey]
    );
  };

  const handlePrice = (price) => {
    setTotalPrice(prevTotal => prevTotal + price);
  };

  // Временное решение
  const handleBook = () => {
    alert(`Вы забронировали ${selectedPlaces.length} мест на ${schedule.date} в ${schedule.time}! Цена ${totalPrice}`);
    navigate(`/movie/${id}`, { state: { movie } });
  };

  if (!movie || !schedule) {
    return (
      <div className="error-message">
        <h2>Данные сеанса не загружены</h2>
        <button onClick={handleBack}>Вернуться к фильму</button>
      </div>
    );
  }

  return (
    <div className="place-picker">
      <div className="cinema-hall">
        <div className="text-screen ">ЭКРАН</div>
        <div className="screen"></div>
        <div className="places-grid">
          {places.map((row, rowIndex) => (

            <div key={rowIndex} className="places-row">
              {rowIndex + 1}
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`place ${seat.type.toLowerCase()} ${selectedPlaces.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''
                    }`}
                  onClick={() => { handlePlaceSelect(rowIndex, seatIndex); handlePrice(seat.price) }}
                >
                  <span className="price">{seat.price} ₽</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="movie-info">
        <label className='date'> Дата</label>
        <p>{schedule.date}</p>
        <label className='time'> Время</label>
        <p>{schedule.time}</p>
        <label className='scene'> Зал</label>
        <p> {schedule.hall?.name}</p>
        <label>Цена</label>
        <p>{totalPrice}</p>
      </div>

      <a onClick={handleBack} className="back-button">
        ← Назад
      </a>
      <a className="book-button" onClick={handleBook}>
        Купить
      </a>
    </div>
  );
};

export default PlacePicker;