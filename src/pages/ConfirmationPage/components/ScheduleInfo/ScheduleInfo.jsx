import PropTypes from 'prop-types';
import styles from "../../ConfirmationPage.module.css";
import { InfoSection } from '../InfoSection/InfoSection';

export const ScheduleInfo = ({ schedule }) => {
    const scheduleItems = [
        { label: 'Дата', value: schedule.date },
        { label: 'Время', value: schedule.time },
        { label: 'Зал', value: schedule.hall?.name }
    ];

    return <InfoSection title="Сеанс" items={scheduleItems} />;
};
