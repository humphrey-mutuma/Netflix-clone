import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import  movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const[trailerUrl, setTrailerUrl] = useState("")
 
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);
const opts ={
  height:'390',
  width:'100%',
  playerVars:{
    // https://developers.google.com/youtube/player_parameters
    autoPlay:1
  }
}

const handleClick = (movie) => {
  if(trailerUrl){
    setTrailerUrl("");
  }else{
    movieTrailer(movie?.name || "")
    .then((url) => {
      //
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    })
    .catch(error => console.log(error));
  }
}
  // const handleClick = (movie) => {
  //   if (trailerUrl != "") setTrailerUrl("");
  //   else {
  //     movieTrailer(movie)
  //       .then((url) => {
  //         const urlParamV = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParamV.get("v"));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={` row_poster ${isLargeRow && "row_posterLarge "}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
