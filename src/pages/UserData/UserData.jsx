import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Modal from './components/Modal/Modal';
import { useBooking, useUser } from "../../context/BookingContext";
import styles from './UserData.module.css';

const UserData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { bookingData } = useBooking();
  const { userData, updateUser } = useUser();
  const { movie, selectedPlaces, totalPrice } = bookingData || {};

  const [formData, setFormData] = useState({
    surname: userData?.surname || '',
    firstName: userData?.name || '',
    phone: userData?.phone || '',
    email: userData?.email || ''
  });

  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!formData.surname.trim()) {
      setError('Пожалуйста, введите фамилию');
      return false;
    }
    if (!formData.firstName.trim()) {
      setError('Пожалуйста, введите имя');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Пожалуйста, введите номер телефона');
      return false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Номер телефона должен содержать минимум 10 цифр');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      updateUser({
        name: formData.firstName,
        surname: formData.surname,
        phone: formData.phone,
        email: formData.email
      });
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    updateUser({
      name: formData.firstName,
      surname: formData.surname,
      phone: formData.phone,
      email: formData.email
    });
    setIsModalOpen(false);
    navigate(`/movie/${id}/userData/payment`);
  };

  const handleClickBack = () => {
    navigate(`/movie/${id}`, { state: { firstName: formData.firstName } });
  };

  return (
    <div className={styles.mainBox}>
      <h2>Введите ваши данные</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="surname">Фамилия*</label>
          <input
            id="surname"
            type="text"
            placeholder="Фамилия"
            value={formData.surname}
            onChange={handleChange}
            required
          />

          <label htmlFor="firstName">Имя*</label>
          <input
            id="firstName"
            type="text"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Номер телефона*</label>
          <input
            id="phone"
            type="tel"
            placeholder="+7 (XXX) XXX-XX-XX"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="user-adres">Адрес</label>
          <input
            id="user-adres"
            type="text"
            value={"г. Новосибирск, ул. Кирова, д. 86"}
            readOnly
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleClickBack}
          >
            Назад
          </button>
          <button
            type="submit"
            className={styles.bookButton}
          >
            Продолжить
          </button>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Подтверждение данных</h3>
        <p>Проверьте правильность введенных данных:</p>
        <ul>
          <li>Фамилия: {formData.surname}</li>
          <li>Имя: {formData.firstName}</li>
          <li>Телефон: {formData.phone}</li>
          <li>Email: {formData.email || 'не указан'}</li>
          {movie && <li>Фильм: {movie.name}</li>}
          {selectedPlaces && <li>Места: {selectedPlaces.join(', ')}</li>}
          {totalPrice && <li>Сумма: {totalPrice} руб.</li>}
        </ul>
        <p className={styles.warningText}>
          *Обратите внимание, что при введении некорректных данных вы не получите билет на почту/номер телефона
        </p>
        <div className={styles.modalButtons}>
          <button onClick={() => setIsModalOpen(false)} className={styles.confirmButton}>Изменить</button>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Подтвердить
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserData;
