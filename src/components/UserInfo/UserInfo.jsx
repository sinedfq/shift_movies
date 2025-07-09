import styles from "../../pages/ConfirmationPage/ConfirmationPage.module.css";
import PropTypes from 'prop-types';

const UserInfo = ({ order, userData, tickets = [], selectedPlaces = [] }) => {
  // Вычисляем данные для отображения мест
  const renderPlaces = () => {
    if (tickets.length > 0) {
      return tickets.map((ticket, index) => (
        <div key={`ticket-${index}`} className={styles.infoRow}>
          <span className={styles.infoLabel}>Место {index + 1}:</span>
          <span className={styles.infoValue}>
            Ряд {ticket.row}, Место {ticket.column}
          </span>
        </div>
      ));
    }

    if (selectedPlaces.length > 0) {
      return selectedPlaces.map((place, index) => {
        const [row, column] = place.split('-').map(Number);
        return (
          <div key={`place-${index}`} className={styles.infoRow}>
            <span className={styles.infoLabel}>Место {index + 1}:</span>
            <span className={styles.infoValue}>
              Ряд {row + 1}, Место {column + 1}
            </span>
          </div>
        );
      });
    }

    return <div className={styles.infoRow}>Места не выбраны</div>;
  };

  // Получаем данные пользователя с fallback значениями
  const fullName = [
    order.person?.lastname || userData?.surname,
    order.person?.firstname || userData?.name,
    order.person?.middlename || userData?.middlename
  ].filter(Boolean).join(' ');

  const phone = order.person?.phone || userData?.phone || 'не указан';
  const email = userData?.email || 'не указан';

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>ФИО:</span>
        <span className={styles.infoValue}>{fullName}</span>
      </div>
      
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Телефон:</span>
        <span className={styles.infoValue}>{phone}</span>
      </div>
      
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Email:</span>
        <span className={styles.infoValue}>{email}</span>
      </div>

      {/* Блок с информацией о местах */}
      {renderPlaces()}
    </div>
  );
};

// Добавляем PropTypes для проверки типов
UserInfo.propTypes = {
  order: PropTypes.shape({
    person: PropTypes.shape({
      lastname: PropTypes.string,
      firstname: PropTypes.string,
      middlename: PropTypes.string,
      phone: PropTypes.string
    })
  }),
  userData: PropTypes.shape({
    surname: PropTypes.string,
    name: PropTypes.string,
    middlename: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }),
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number,
      column: PropTypes.number
    })
  ),
  selectedPlaces: PropTypes.arrayOf(PropTypes.string)
};

UserInfo.defaultProps = {
  order: {},
  userData: {},
  tickets: [],
  selectedPlaces: []
};

export default UserInfo;