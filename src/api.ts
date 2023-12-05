import axios from "axios";

const API_KEY = "99ecb4851551f1f21e9c993e01dd9f8b";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoivesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: IMovies[];
  total_pages: number;
  total_result: number;
}
export interface IMovies {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
  release_date: string;
  vote_average: number;
}

export const getMovies = async () => {
  const response = await axios.get(
    `${BASE_PATH}/movie/now_playing?language=ko&api_key=${API_KEY}`
  );
  return response.data;
};

export const getMovieDetail = async (movieId: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko&api_key=${API_KEY}`
  );
  return response.data;
};
