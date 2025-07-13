import React from 'react';
import PropTypes from 'prop-types';

const MovieSchedule = ({
    schedules,
    loadingSchedules,
    expandedDate,
    toggleDate,
    groupSeancesByHall,
    handleSeanceSelect,
}) => {
    return (
        <div className="schedules-section">
            <h3>Выберите дату и время</h3>
            {!loadingSchedules && schedules.length > 0 && (
                <div className="dates-container">
                    <div className="dates-list-horizontal">
                        {schedules.map((schedule, index) => (
                            <div key={index} className="date-item-horizontal">
                                <div
                                    className="date-header-horizontal"
                                    onClick={() => toggleDate(schedule.date)}
                                >
                                    <span>{schedule.date.split('.').slice(0, 2).join('.')}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {schedules
                        .filter(schedule => expandedDate === schedule.date)
                        .map((schedule, index) => (
                            <div key={index} className="date-content-independent">
                                {groupSeancesByHall(schedule.seances).map((hall, hallIndex) => (
                                    <div key={hallIndex} className="hall-section">
                                        <div className="hall-info">
                                            <h4 className="hall-name">{hall.hallInfo.name}</h4>
                                            <span className="hall-type">{hall.hallInfo.type}</span>
                                        </div>

                                        <div className="times-list-horizontal">
                                            {hall.seances.map((seance, seanceIndex) => (
                                                <a
                                                    key={seanceIndex}
                                                    className="time-header-horizontal"
                                                    onClick={() => handleSeanceSelect(schedule.date, seance)}
                                                >
                                                    {seance.time}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {!schedule.seances?.length && <p>Нет сеансов на эту дату</p>}
                            </div>
                        ))
                    }
                </div>
            )}
            {!loadingSchedules && schedules.length === 0 && <p>Нет доступных расписаний</p>}
        </div>
    );
};

MovieSchedule.propTypes = {
    schedules: PropTypes.array.isRequired,
    loadingSchedules: PropTypes.bool.isRequired,
    expandedDate: PropTypes.string,
    toggleDate: PropTypes.func.isRequired,
    groupSeancesByHall: PropTypes.func.isRequired,
    handleSeanceSelect: PropTypes.func.isRequired,
};

export default MovieSchedule;