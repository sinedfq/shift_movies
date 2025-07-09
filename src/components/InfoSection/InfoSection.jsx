import PropTypes from 'prop-types';
import styles from '../../pages/ConfirmationPage/ConfirmationPage.module.css';

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

// Использование компонента
export const MovieInfo = ({ movie }) => {
    const movieItems = [
        { label: 'Название', value: movie.name },
        {
            label: 'Жанр',
            value: Array.isArray(movie.genres)
                ? movie.genres.join(', ')
                : movie.genre || 'Не указано'
        }
    ];

    return <InfoSection title="Фильм" items={movieItems} />;
};

export const ScheduleInfo = ({ schedule }) => {
    const scheduleItems = [
        { label: 'Дата', value: schedule.date },
        { label: 'Время', value: schedule.time },
        { label: 'Зал', value: schedule.hall?.name }
    ];

    return <InfoSection title="Сеанс" items={scheduleItems} />;
};

