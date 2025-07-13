import PropTypes from 'prop-types';
import styles from "../../ConfirmationPage.module.css";
import { InfoSection } from '../InfoSection/InfoSection';

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