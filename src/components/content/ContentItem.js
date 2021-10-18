import React from "react";

import classes from './ContentItem.module.css';
import { img_300, unavailable } from '../../config/imgConfig';

const ContentItem = (props) => {
    return (
        <div className={classes.card}>
            <img src={props.poster ? `${img_300}/${props.poster}` : unavailable} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.title}</p>
        </div>
    );
};

export default ContentItem;