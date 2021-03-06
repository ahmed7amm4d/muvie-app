import React, { useEffect, useState } from "react";
import axios from "axios";

import ContentItem from "../components/content/ContentItem";
import classes from './styles/Pages.module.css';
import Genres from "../components/genres/Genres";
import useGenres from '../hooks/useGenres';
import CustomPagination from "../components/content/pagination/CustomPagination";

const Movies = (props) => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreString = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreString}`);
        setMovies(data.results);
        setNumberOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchMovies();
        //eslint-disable-next-line
    }, [page, genreString]);

    return (
        <div className="page-container">
            <h1 className="page-title"><span className="page-title-span">Discover</span> Movies</h1>
            <Genres type='movie' genres={genres} selectedGenres={selectedGenres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
            <div className={classes.container}>
                {movies && movies.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} rating={item.vote_average} mediaType="movie" language={item.original_language} />;
                })}
            </div>
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
        </div>
    );
};

export default Movies;