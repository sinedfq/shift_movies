import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useUser } from '../../context/BookingContext';
import PlacesInfo from './components/PlacesInfo/PlacesInfo';
import UserInfo from './components/UserInfo/UserInfo';
import TicketInfo from './components/TicketInfo/TicketInfo';
import { MovieInfo } from './components/MovieInfo/MovieInfo';
import { ScheduleInfo } from './components/ScheduleInfo/ScheduleInfo';
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

                    <TicketInfo
                        orderId={orderId}
                        orderNumber={orderNumber}
                        bookingDate={bookingDate}
                        status={status}
                    />

                    <MovieInfo movie={movie} />
                    <ScheduleInfo schedule={schedule} />

                    <div className={styles.infoSection}>
                        <h4>Места</h4>
                        <PlacesInfo tickets={tickets} selectedPlaces={selectedPlaces} />
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
                    <UserInfo
                        order={order}
                        userData={userData}
                        tickets={tickets}
                        selectedPlaces={selectedPlaces}
                    />
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