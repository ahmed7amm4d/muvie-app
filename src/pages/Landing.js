import React from "react";
import { useHistory } from "react-router";

import classes from './styles/Landing.module.css';

const Trending = (props) => {
    const history = useHistory();
    const landingButtonHandler = () => {
        history.push('/trending');
    };

    return (
        <div className={classes.container}>
            <div className="page-container">
                <h1 className={classes['landing-page-title']}>Welcome to <br />Muvie</h1>
                <p className={classes['landing-page-paragraph']}>Unlimited movies, TV shows, and more for you to discover.</p>
                <button className={classes['landing-page-button']} onClick={landingButtonHandler}>See What's Trending!</button>
            </div>
        </div>
    );
};

export default Trending;