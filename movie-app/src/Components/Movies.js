import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'd8d65361d6cff5ea7dcbd874759babb2';
  const baseUrl = 'https://api.themoviedb.org/3';

  const fetchMovies = async () => {
    try {
      
      setLoading(true);

      const hasFilters = genreFilter || ratingFilter;

      const apiQuery = hasFilters? `&with_genres=${genreFilter}&certification_country=US&certification=${ratingFilter}`: '';

      const response = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}${apiQuery}`);

     
      if (Array.isArray(response.data.results)) {
        setMovies(response.data.results);
        setError(null);
      } else {
        setError('Invalid response format. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieByTitle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}`);

      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
      setError('Error fetching search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const handleButtonClick = () => {
    fetchMovieByTitle();
  };

  useEffect(() => {
    fetchMovies();
  }, [genreFilter, ratingFilter]);

  return (
    <div className="container mt-5">
      <form className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search movie by title"
          value={searchTerm}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search movie by rating"
          value={ratingFilter}
          onChange={handleRatingChange}
        />
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search movie by genre"
          value={genreFilter}
          onChange={handleGenreChange}
        />
        <button
          type="button"
          className="btn btn-primary ml-3"
          onClick={handleButtonClick}
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center">No movies found</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className='d-flex flex-wrap justify-content-around'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
