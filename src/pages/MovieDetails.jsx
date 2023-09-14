import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Container } from '@mui/material';
import NavBar from '../components/NavBar';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genreNames, setGenreNames] = useState([]);

  const formatToUTCYear = (dateString) => {
    const localDate = new Date(dateString);
    const utcYear = localDate.getUTCFullYear();
    return utcYear.toString();
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '7a529b24ef789e4a50de476f2a2bbd35';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        );
        const formattedDate = formatToUTCYear(response.data.release_date);

        // Fetch genre data
        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        // Map genre IDs to genre names
        const genreNames = response.data.genres.map((genre) =>
          genreResponse.data.genres.find((g) => g.id === genre.id).name
        );

        setGenreNames(genreNames); // Store genre names in state
        const updatedMovieDetails = {
          ...response.data,
          release_date: formattedDate,
        };
        setMovieDetails(updatedMovieDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
        
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <NavBar />
      <>
        {loading ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner />
          </div>
        ) : movieDetails ? (
          <Container>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              style={{
                height: '15rem',
                width: '50%',
                borderRadius: '1rem',
              }}
              data-testid="movie-poster"
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p data-testid="movie-title">
                {movieDetails.title} <span>.</span>
              </p>
              <p data-testid="movie-release-date">
                {movieDetails.release_date} <span>.</span>
              </p>
              <p data-testid="movie-runtime">
                {movieDetails.runtime}  min
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>

              {/* Display genre names in separate divs */}
              {genreNames.map((genreName, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #dcbfc7',
                    fontSize: '.6rem',
                    borderRadius: '.6rem',
                    padding: '.3rem',
                    margin: '0 .5rem',
                  }}
                >
                  {genreName}
                </div>
              ))}
            </div>
            <p style={{marginLeft: '7rem'}}>fff</p>
            </div>
           
            
            <p
              data-testid="movie-overview"
              style={{
                textAlign: 'left',
                width: '50%',
                marginLeft: '18rem',
                color: 'gray',
                fontSize: '.8rem',
              }}
            >
              {movieDetails.overview}
            </p>
          </Container>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: 'red' }}>Unable to load movie details, try again later</p>
          </div>
        )}
      </>
    </div>
  );
}

export default MovieDetails;
