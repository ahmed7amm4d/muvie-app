import axios from "axios";
import React, { useEffect, useState } from "react";

import ContentItem from "../components/content/ContentItem";
import classes from './Trending.module.css';

const Trending = (props) => {
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`);
        setContent(data.results);
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <React.Fragment>
            <h1 className="page-title">Trending Today</h1>
            <div className={classes.container}>
                {content && content.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} mediaType={item.media_type} rating={item.vote_average} />;
                })}
            </div>
        </React.Fragment>
    );
};

export default Trending;