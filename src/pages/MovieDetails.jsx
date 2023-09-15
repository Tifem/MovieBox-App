import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";

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
        const apiKey = "7a529b24ef789e4a50de476f2a2bbd35";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const formattedDate = formatToUTCYear(response.data.release_date);

        // Fetch genre data
        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        // Map genre IDs to genre names
        const genreNames = response.data.genres.map(
          (genre) =>
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
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div
      className="h-[100vh] w-full"
      style={{ display: "flex", alignItems: "center" }}
    >
      <NavBar />
      <>
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        ) : movieDetails ? (
          <div className="w-full p-12 flex flex-col h-[100vh] ml-48">
            <div className="w-[70%] h-[25rem]">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="w-full object-cover h-full rounded-2xl"
                data-testid="movie-poster"
              />
            </div>
            <div className="flex items-center my-8 font-bold text-2xl text-gray-600 gap-2">
              <p data-testid="movie-title">{movieDetails.title}</p>
              <span className="font-bold text-2xl">.</span>
              <p data-testid="movie-release-date">
                {" "}
                {movieDetails.release_date}
              </p>
              <span className="font-bold text-2xl">.</span>
              <p data-testid="movie-runtime">{movieDetails.runtime} m</p>
              {/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
              {/* Display genre names in separate divs */}
              {genreNames.map((genreName, index) => (
                <div
                  className="rounded-3xl border border-gray-300] text-sm text-[#BE123C] py-1 px-2"
                  key={index}
                >
                  {genreName}
                </div>
              ))}
              {/* </div> */}
              {/* <p style={{ marginLeft: "7rem" }}>fff</p> */}
            </div>

            <p className="text-lg w-1/2 text-justify text-gray-600" data-testid="movie-overview">
              {movieDetails.overview}
            </p>
          </div>
        ) : (
          <div
            className="flex items-center justify-center text-[#BE123C]"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "red" }}>
              Unable to load movie details, try again later
            </p>
          </div>
        )}
      </>
    </div>
  );
}

export default MovieDetails;
