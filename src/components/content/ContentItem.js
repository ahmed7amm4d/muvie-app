import React from "react";

import classes from './ContentItem.module.css';
import { img_300, unavailable } from '../../config/imgConfig';
import Badge from "@material-ui/core/Badge";

const ContentItem = (props) => {
    return (
        <div className={classes.card}>
            <Badge badgeContent={props.rating} color={props.rating > 6 ? "primary" : "secondary"} />
            <img className={classes.poster} src={props.poster ? `${img_300}/${props.poster}` : unavailable} alt={props.title} />
            <b className={classes.title}>{props.title}</b>
            <span className={classes.subtitle}>
                {props.mediaType === 'tv' ? 'TV Show' : 'Movie'}
                <span className={classes.subtitle}>{props.date}</span>
            </span>
        </div>
    );
};

export default ContentItem;