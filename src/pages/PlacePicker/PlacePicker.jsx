import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './PlacePicker.module.css';
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

  const handlePlaceSelect = (rowIndex, seatIndex) => {
    const seat = places[rowIndex][seatIndex];
    const placeKey = `${rowIndex}-${seatIndex}`;

    if (seat.type === 'BLOCKED' || seat.type === 'PAYED') return;

    setSelectedPlaces(prev => {
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
      <div className={styles.errorMessage}>
        <h2>Данные сеанса не загружены</h2>
        <button onClick={handleBack}>Вернуться к фильму</button>
      </div>
    );
  }

  return (
    <div className={styles.placePicker}>
      <div className={styles.cinemaHall}>
        
        <div className={styles.screen} style={{ width: screenWidth }}>
          <p className={styles.screenLabel}>Экран</p>
        </div>
        <div className={styles.placesGrid}>
          {places.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={styles.placesRow}
              ref={rowIndex === 0 ? placesGridRef : null}
            >
              {row.map((seat, seatIndex) => {
                const placeKey = `${rowIndex}-${seatIndex}`;
                const isSelected = selectedPlaces.includes(placeKey);
                const typeClass = styles[seat.type.toLowerCase()];
                return (
                  <div
                    key={seatIndex}
                    className={`${styles.place} ${typeClass} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handlePlaceSelect(rowIndex, seatIndex)}
                    title={seat.type === 'BLOCKED' || seat.type === 'PAYED' ? 'Место занято' : `Цена: ${seat.price} ₽`}
                  >
                    {seat.price} ₽
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.movieInfo}>
        <label className={styles.date}>Дата</label>
        <p>{schedule.date}</p>
        <label className={styles.time}>Время</label>
        <p>{schedule.time}</p>
        <label className={styles.scene}>Зал</label>
        <p>{schedule.hall?.name}</p>
        <label className={styles.scene}>Сумма</label>
        <p>{totalPrice} ₽</p>
      </div>

      <div className={styles.buttons}>
        <button onClick={handleBack} className={styles.backButton}>
          Назад
        </button>
        <button
          className={styles.bookButton}
          onClick={handleBook}
          disabled={selectedPlaces.length === 0}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default PlacePicker;
