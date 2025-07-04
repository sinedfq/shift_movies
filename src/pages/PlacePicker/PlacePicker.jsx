import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PlacePicker.css'
import { useBooking } from '../../context/BookingContext';

const PlacePicker = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const placesGridRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState('70%');
  const { movie, schedule } = state || {};
  const places = schedule?.hall?.places || [];
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  useEffect(() => {
    if (placesGridRef.current) {
      const gridWidth = placesGridRef.current.offsetWidth;
      setScreenWidth(`${gridWidth}px`);
    }
  }, []);

  const handleBack = () => {
    navigate(`/movie/${id}`, { state: { movie } });
  };

  const handlePlaceSelect = (rowIndex, seatIndex, price) => {
    setSelectedPlaces(prev => {
      const placeKey = `${rowIndex}-${seatIndex}`;
      const isSelected = prev.includes(placeKey);

      const newSelected = isSelected
        ? prev.filter(p => p !== placeKey)
        : [...prev, placeKey];

      const newTotal = newSelected.reduce((sum, key) => {
        const [rIdx, sIdx] = key.split('-').map(Number);
        return sum + places[rIdx][sIdx].price;
      }, 0);

      setTotalPrice(newTotal);

      return newSelected;
    });
  };

  const handleBook = () => {
    updateBooking({
      movie,
      selectedPlaces,
      totalPrice,
      schedule
    });
    navigate(`/movie/${id}/userData`);
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
        <div className='screen' style={{ width: screenWidth }}>
          
        </div>
        <div className="places-grid">
          {places.map((row, rowIndex) => (
            <div key={rowIndex} className="places-row" ref={placesGridRef}>
              {rowIndex + 1}
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`place ${seat.type.toLowerCase()} ${selectedPlaces.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''
                    }`}
                  onClick={() => handlePlaceSelect(rowIndex, seatIndex, seat.price)}
                >
                  <span className="price">{seat.price} ₽</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="movie-info">
        <label className='date'>Дата</label>
        <p>{schedule.date}</p>
        <label className='time'>Время</label>
        <p>{schedule.time}</p>
        <label className='scene'>Зал</label>
        <p>{schedule.hall?.name}</p>
        <label className='scene'>Цена</label>
        <p>{totalPrice} ₽</p>
      </div>

      <button onClick={handleBack} className="back-button">
        Назад
      </button>
      <button
        className="book-button"
        onClick={handleBook}
        disabled={selectedPlaces.length === 0}
      >
        Купить
      </button>
    </div>
  );
};

export default PlacePicker;