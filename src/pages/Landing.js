import React from "react";

import classes from './styles/Landing.module.css';

const Trending = (props) => {
    return (
        <div className={classes.container}>
            <div className="page-container">
                <h1 className={classes['landing-page-title']}>Welcome to <br />Muvie</h1>
                <p className={classes['landing-page-paragraph']}>Unlimited movies, TV shows, and more for you to discover.</p>
            </div>
        </div>
    );
};

export default Trending;