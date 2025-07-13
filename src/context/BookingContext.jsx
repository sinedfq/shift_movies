import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    movie: null,
    selectedPlaces: [],
    totalPrice: 0,
    schedule: null
  });

  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: ''
  });

  const updateBooking = (newData) => {
    setBookingData(prev => ({ ...prev, ...newData }));
  };

  const updateUser = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ 
      bookingData, 
      userData,
      updateBooking, 
      updateUser 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return {
    bookingData: context.bookingData,
    updateBooking: context.updateBooking
  };
};

export const useUser = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useUser must be used within a BookingProvider');
  }
  return {
    userData: context.userData,
    updateUser: context.updateUser
  };
};