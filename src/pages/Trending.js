import React, { useEffect, useState } from "react";
import axios from "axios";

import ContentItem from "../components/content/ContentItem";
import classes from './styles/Pages.module.css';
import CustomPagination from "../components/content/pagination/CustomPagination";

const Trending = (props) => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results);
        //eslint-disable-next-line
    };

    useEffect(() => {
        fetchTrending();
        //eslint-disable-next-line
    }, [page]);

    return (
        <div className="page-container">
            <h1 className="page-title"><span className="page-title-span">Trending</span> Today</h1>
            <div className={classes.container}>
                {content && content.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} mediaType={item.media_type} rating={item.vote_average} language={item.original_language} />;
                })}
            </div>
                <CustomPagination setPage={setPage} numberOfPages={5} />
        </div>
    );
};

export default Trending;
