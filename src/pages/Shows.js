import React, { useEffect, useState } from "react";
import axios from "axios";

import ContentItem from "../components/content/ContentItem";
import classes from './styles/Pages.module.css';
import Genres from "../components/genres/Genres";
import useGenres from '../hooks/useGenres';
import CustomPagination from "../components/content/pagination/CustomPagination";

const Shows = (props) => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreString = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreString}`);
        setMovies(data.results);
        setNumberOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchMovies();
        //eslint-disable-next-line
    }, [page, genreString]);

    return (
        <React.Fragment>
            <h1 className="page-title">Discover tv-shows</h1>
            <Genres type='tv' genres={genres} selectedGenres={selectedGenres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
            <div className={classes.container}>
                {movies && movies.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} mediaType="tv" rating={item.vote_average} language={item.original_language} />;
                })}
            </div>
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
        </React.Fragment>
    );
};

export default Shows;