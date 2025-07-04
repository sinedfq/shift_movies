import { useBooking } from "../../context/BookingContext";
import { useUser } from "../../context/BookingContext";

const Payment = () => {
  const { bookingData } = useBooking();
  const { userData } = useUser();
  const { movie, selectedPlaces, totalPrice } = bookingData;

  return (
    <div>
      <p>{movie.name}</p>
      <p>{userData.name}</p>
    </div>
  );
};

export default Payment