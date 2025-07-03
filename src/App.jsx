import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchMovies } from './api/api';
import MoviesList from './components/MovieList/MovieList';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import PlacePicker from './pages/PlacePicker/PlacePicker'
import Header from './components/Header/Header';
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

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MovieApp />
            </Layout>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Layout>
              <MovieDetail />
            </Layout>
          }
        />
        <Route
          path="/movie/:id/places"
          element={
            <Layout>
              <PlacePicker />
            </Layout>
          }
        />  
      </Routes>
    </Router>
  );
}

export default App;