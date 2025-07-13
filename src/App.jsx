import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { fetchMovies } from './api/api';
import MoviesList from './components/MovieList/MovieList';
import Header from './components/Header/Header';
import { BookingProvider } from './context/BookingContext';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import PlacePicker from './pages/PlacePicker/PlacePicker';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import UserData from './pages/UserData/UserData';
import Payment from './pages/PaymentPage/Payment';
import './App.css';

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const films = await fetchMovies();
      setMovies(films);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="status-message loading">
        <div className="spinner"></div>
        Загрузка фильмов...
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        <h3>Ошибка</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={loadMovies}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return <MoviesList movies={movies} />;
}

function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MovieApp />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="movie/:id/places" element={<PlacePicker />} />
            <Route path="movie/:id/userData" element={<UserData />} />
            <Route path="movie/:id/userData/payment" element={<Payment />} />
            <Route path="movie/:id/confirmation" element={<ConfirmationPage />} />
          </Route>
        </Routes>
      </BookingProvider>
    </Router>
  );
}

export default App;