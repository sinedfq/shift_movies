import styles from "../../pages/ConfirmationPage/ConfirmationPage.module.css";
import PropTypes from 'prop-types';

const TicketInfo = ({ orderId, orderNumber, bookingDate, status }) => {
  const ticketData = [
    { label: "ID бронирования:", value: orderId || 'N/A' },
    { label: "Номер заказа:", value: orderNumber || 'N/A' },
    { label: "Дата бронирования:", value: bookingDate || 'N/A' },
    { label: "Статус:", value: status || 'N/A' }
  ];

  return (
    <div className={styles.infoSection}>
      {ticketData.map((item, index) => (
        <div key={`ticket-info-${index}`} className={styles.infoRow}>
          <span className={styles.infoLabel}>{item.label}</span>
          <span className={styles.infoValue}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

TicketInfo.propTypes = {
  orderId: PropTypes.string,
  orderNumber: PropTypes.string,
  bookingDate: PropTypes.string,
  status: PropTypes.string
};

TicketInfo.defaultProps = {
  orderId: 'N/A',
  orderNumber: 'N/A',
  bookingDate: 'N/A',
  status: 'N/A'
};

export default TicketInfo;