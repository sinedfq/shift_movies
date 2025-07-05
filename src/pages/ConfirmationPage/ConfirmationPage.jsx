import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useUser } from '../../context/BookingContext';
import styles from './ConfirmationPage.module.css';

const ConfirmationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { bookingData } = useBooking();
    const { userData } = useUser();
    const { movie, selectedPlaces, totalPrice, schedule } = bookingData || {};

    const apiResponse = state?.bookingData || {};
    const order = apiResponse.order || {};
    const tickets = order.tickets || [];

    const orderId = tickets[0]?.orderId || 'N/A';
    const orderNumber = order.orderNumber || 'N/A';
    const bookingDate = new Date(order.created || new Date()).toLocaleString();
    const status = order.status || 'N/A';

    const handleReturnHome = () => {
        navigate('/');
    };

    if (!movie || !schedule) {
        return (
            <div className={styles.container}>
                <h2>Данные бронирования не найдены</h2>
                <button
                    className={styles.homeButton}
                    onClick={handleReturnHome}
                >
                    Вернуться на главную
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.confirmationCard}>
                <div className={styles.header}>
                    <h2>Бронирование подтверждено!</h2>
                    <div className={styles.successIcon}>✓</div>
                </div>

                <div className={styles.ticketInfo}>
                    <h3>Электронный билет</h3>

                    <div className={styles.infoSection}>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>ID бронирования:</span>
                            <span className={styles.infoValue}>{orderId}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Номер заказа:</span>
                            <span className={styles.infoValue}>{orderNumber}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Дата бронирования:</span>
                            <span className={styles.infoValue}>{bookingDate}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Статус:</span>
                            <span className={styles.infoValue}>{status}</span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h4>Фильм</h4>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Название:</span>
                            <span className={styles.infoValue}>{movie.name}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Жанр:</span>
                            <span className={styles.infoValue}>
                                {Array.isArray(movie.genres)
                                    ? movie.genres.join(', ')
                                    : movie.genre || 'Не указано'}
                            </span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h4>Сеанс</h4>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Дата:</span>
                            <span className={styles.infoValue}>{schedule.date}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Время:</span>
                            <span className={styles.infoValue}>{schedule.time}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Зал:</span>
                            <span className={styles.infoValue}>{schedule.hall?.name}</span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h4>Места</h4>
                        {(() => {
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
                        })()}
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Итого к оплате:</span>
                            <span className={styles.totalPrice}>{totalPrice} ₽</span>
                        </div>
                    </div>
                </div>

                <div className={styles.userInfo}>
                    <h4>Данные покупателя</h4>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>ФИО:</span>
                        <span className={styles.infoValue}>
                            {order.person?.lastname || userData?.surname} {order.person?.firstname || userData?.name} {order.person?.middlename || userData?.middlename}
                        </span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Телефон:</span>
                        <span className={styles.infoValue}>{order.person?.phone || userData?.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue}>{userData?.email || 'не указан'}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.homeButton}
                        onClick={handleReturnHome}
                    >
                        Вернуться на главную
                    </button>
                </div>

                <div className={styles.footer}>
                    <p>Билет также отправлен на вашу электронную почту и номер телефона</p>
                    <p>Приходите в кинотеатр за 15 минут до сеанса</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;