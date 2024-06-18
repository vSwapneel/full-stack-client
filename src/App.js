import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import { TailSpin } from "react-loader-spinner";


function App() {

  const [movies, setMovies] = useState();
  const [loader, setLoader] = useState(true);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    getMovies()
  },[]);

  const getMovies = async () =>{
    try{
      setLoader(true);
      const response = await api.get("/api/v1/movies");

      console.log(response.data)
      setMovies(response.data);
    } catch(err){
      console.log(err);
    }
    setLoader(false);
  } 

  const   getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviewIds);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  return (
    <div>
      <Header/>
      {
        loader ? (<div className='loader'>
          {/* Loading... */}
          <TailSpin color="gold" radius={"8px"} />
          </div>) 
        :(<div className="App">
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home movies={movies} />} ></Route>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
              <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
              <Route path="*" element = {<NotFound/>}></Route>
            </Route>
          </Routes>
        </div>)
      }
    </div>
  );
}

export default App;
