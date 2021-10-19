import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import ContentItem from "../components/content/ContentItem";
import classes from './styles/Trending.module.css';
import Paginate from "../components/content/Paginate";

const Trending = (props) => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = useCallback(async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results);
    }, [page]);

    useEffect(() => {
        fetchTrending();
    }, [fetchTrending]);

    return (
        <React.Fragment>
            <h1 className="page-title">Trending Today</h1>
            <div className={classes.container}>
                {content && content.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} mediaType={item.media_type} rating={item.vote_average} language={item.original_language} />;
                })}
            </div>
            <Paginate setPage={setPage} pageNumbers={10} />
        </React.Fragment>
    );
};

export default Trending;