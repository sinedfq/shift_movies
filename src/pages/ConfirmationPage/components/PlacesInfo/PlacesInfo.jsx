import styles from "../../ConfirmationPage.module.css";

const PlacesInfo = ({ tickets, selectedPlaces }) => {
  if (tickets.length > 0) {
    return tickets.map((ticket, index) => (
      <div key={index} className={styles.infoRow}>
        <span className={styles.infoLabel}>Место {index + 1}:</span>
        <span className={styles.infoValue}>
          Ряд {ticket.row}, Место {ticket.column}
        </span>
      </div>
    ));
  }

  if (selectedPlaces?.length > 0) {
    return selectedPlaces.map((place, index) => (
      <div key={index} className={styles.infoRow}>
        <span className={styles.infoLabel}>Место {index + 1}:</span>
        <span className={styles.infoValue}>
          Ряд {parseInt(place.split('-')[0]) + 1}, Место {parseInt(place.split('-')[1]) + 1}
        </span>
      </div>
    ));
  }

  return <div className={styles.infoRow}>Места не выбраны</div>;
};

export default PlacesInfo