export const fetchMovies = async () => {
  try {
    const response = await fetch('https://shift-intensive.ru/api/cinema/films');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.reason || 'Failed to fetch movies');
    }

    return data.films;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`https://shift-intensive.ru/api/cinema/film/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.reason || 'Failed to fetch movie');
    }

    return data.film || data.films[0]; 
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export const fetchMovieTime = async (id) => {
  try {
    const response = await fetch(`https://shift-intensive.ru/api/cinema/film/${id}/schedule`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.reason || 'Failed to fetch movie');
    }

    
    return data
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
}
