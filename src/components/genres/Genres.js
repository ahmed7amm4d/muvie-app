import React, { useEffect } from "react";
import axios from "axios";

import classes from './Genres.module.css';
import { Chip } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
    palette: {
      type: "dark",
    }
  });

const Genres = (props) => {
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        props.setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            props.setGenres({});
        };
        // eslint-disable-next-line
    }, [])

    const chipClickHandler = (genre) => {
        props.setSelectedGenres([...props.selectedGenres, genre]);
        props.setGenres(props.genres.filter((g) => {
            return g.id !== genre.id;
        }));
        props.setPage(1);
    };

    const chipDeleteHandler = (genre) => {
        props.setSelectedGenres(props.selectedGenres.filter((g) => {
            return g.id !== genre.id;
        }));
        props.setGenres([...props.genres, genre]);
        props.setPage(1);
    };

    return (
        <React.Fragment>
        <div className={classes.container}>
            <ThemeProvider theme={darkTheme}>
                {props.selectedGenres && props.selectedGenres.map((genre) => {
                    return <Chip key={genre.id} label={genre.name} variant="outlined" onDelete={() => chipDeleteHandler(genre)}  
                    style={{backgroundColor: 'palevioletred', borderColor: "palevioletred", borderRadius: 5, marginRight: 10, fontFamily: "inherit", marginBottom: 10}} />
                })}
                {props.genres && props.genres.map((genre) => {
                    return <Chip key={genre.id} label={genre.name} variant="outlined" onClick={() => chipClickHandler(genre)} 
                    style={{borderColor: "palevioletred", borderRadius: 5, marginRight: 10, fontFamily: "inherit", marginBottom: 10}} />
                })}
            </ThemeProvider>
        </div>
        <hr className={classes.hr1} />
        </React.Fragment>
    );
};

export default Genres;