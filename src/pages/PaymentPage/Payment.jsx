import { useState } from 'react';
import { useBooking } from "../../context/BookingContext";
import { useUser } from "../../context/BookingContext";
import styles from "./Payment.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { formatCardNumber, formatExpiry, handleCvcChange } from "../../Formatting/Formatting.jsx"

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  const { userData } = useUser();
  const { movie, selectedPlaces, totalPrice, schedule } = bookingData;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    if (input.length < cardNumber.length) {
      setCardNumber(input);
      return;
    }
    setCardNumber(formatCardNumber(input));
  };

  const handleExpiryChange = (e) => {
    const input = e.target.value;
    if (input.length < expiry.length) {
      setExpiry(input);
      return;
    }
    setExpiry(formatExpiry(input));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!cardNumber || !expiry || !cvc) {
      setError('Пожалуйста, заполните все поля карты');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Номер карты должен содержать 16 цифр');
      return;
    }

    if (cvc.length < 3) {
      setError('CVC код должен содержать 3 цифры');
      return;
    }

    setIsLoading(true);

    try {
      const ticketData = {
        filmId: movie.id,
        person: {
          firstname: userData.name,
          lastname: userData.surname,
          middlename: userData.middlename || '',
          phone: userData.phone
        },
        debitCard: {
          pan: cardNumber.replace(/\s/g, ''),
          expireDate: expiry,
          cvv: cvc
        },
        seance: {
          date: schedule.date,
          time: schedule.time
        },
        tickets: selectedPlaces.map(place => {
          const [row, column] = place.split('-');
          return { row: parseInt(row) + 1, column: parseInt(column) + 1 };
        })
      };

      const response = await fetch('https://shift-intensive.ru/api/cinema/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при оплате');
      }

      const result = await response.json();
      console.log('Payment successful:', result);
      navigate(`/movie/${id}/confirmation`, { state: { bookingData: result } });
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Произошла ошибка при оплате');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>Оплата</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.cardBox}>
          <div className={styles.inputGroup}>
            <label htmlFor="card-number">Номер карты</label>
            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              autoComplete="cc-number"
              className={styles.input}
            />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="card-expiry">Срок действия</label>
              <input
                id="card-expiry"
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="cc-exp"
                className={styles.inputDate}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="card-cvc">CVC/CVV</label>
              <input
                id="card-cvc"
                type="text"
                inputMode="numeric"
                value={cvc}
                onChange={(e) => handleCvcChange(e, setCvc)}
                placeholder="123"
                maxLength={4}
                autoComplete="cc-csc"
                className={styles.inputCvc}
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Обработка...' : `Оплатить ${totalPrice} ₽`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;