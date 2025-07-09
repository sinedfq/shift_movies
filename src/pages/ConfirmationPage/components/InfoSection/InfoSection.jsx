import PropTypes from 'prop-types';
import styles from "../../ConfirmationPage.module.css";
import { MovieInfo } from '../MovieInfo/MovieInfo';

export const InfoSection = ({ title, items }) => {
    return (
        <div className={styles.infoSection}>
            <h4>{title}</h4>
            {items.map((item, index) => (
                <div key={`info-row-${index}`} className={styles.infoRow}>
                    <span className={styles.infoLabel}>{item.label}:</span>
                    <span className={styles.infoValue}>{item.value}</span>
                </div>
            ))}
        </div>
    );
};

InfoSection.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.node
            ])
        })
    ).isRequired
};

