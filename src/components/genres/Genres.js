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
            props.setGenres([]);
        };
        // eslint-disable-next-line
    }, [])

    const chipClickHandler = (genre) => {
        props.setSelectedGenres([...props.selectedGenres, genre].sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }));
        props.setGenres(props.genres.filter((g) => {
            return g.id !== genre.id;
        }));
        props.setPage(1);
    };

    const chipDeleteHandler = (genre) => {
        console.log(props.selectedGenres);
        props.setSelectedGenres(props.selectedGenres.filter((g) => {
            return g.id !== genre.id;
        }));
        props.setGenres([...props.genres, genre].sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }));
        props.setPage(1);
    };

    return (
        <React.Fragment>
        <div className={classes.container}>
            <ThemeProvider theme={darkTheme}>
                {props.selectedGenres && props.selectedGenres.map((genre) => {
                    return <Chip key={genre.id} label={genre.name} variant="outlined" onDelete={() => chipDeleteHandler(genre)}  
                    style={{ borderColor: "#f9002b", borderRadius: 2, marginRight: 10, fontFamily: "inherit", marginBottom: 10, fontSize: '0.9rem' }} />
                })}
                {props.genres && props.genres.map((genre) => {
                    return <Chip key={genre.id} label={genre.name} variant="outlined" onClick={() => chipClickHandler(genre)} 
                    style={{ borderColor: "white", borderRadius: 2, marginRight: 10, fontFamily: "inherit", marginBottom: 10, fontSize: '0.9rem' }} />
                })}
            </ThemeProvider>
        </div>
        <hr className={classes.hr1} />
        </React.Fragment>
    );
};

export default Genres;