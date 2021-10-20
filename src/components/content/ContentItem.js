import React from "react";

import classes from './ContentItem.module.css';
import { img_300, unavailable } from '../../config/imgConfig';

const ContentItem = (props) => {
    return (
        <div className={classes.card}>
            <span className={props.rating? classes.badge : classes.nobadge}>Rating: {props.rating}</span>
            <div className={classes.poster}>
                <img className={classes.poster} src={props.poster ? `${img_300}/${props.poster}` : unavailable} alt={props.title} />
                <span className={classes.language}>{props.language}</span>
            </div>
            <span className={classes.title}>{props.title}</span>
            <div className={classes.subtitle}>
                <span>{props.date}</span>
                <span className={classes.type}>{props.mediaType === 'tv' ? 'TV Show' : 'Movie'}</span>
            </div>
        </div>
    );
};

export default ContentItem; 