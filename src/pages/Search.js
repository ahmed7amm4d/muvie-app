import React, { useEffect, useState } from "react";
import axios from "axios";

import { TextField, Button, Tabs, Tab } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { IoSearch } from "react-icons/io5";
import ContentItem from "../components/content/ContentItem";
import classes from './styles/Pages.module.css';
import CustomPagination from "../components/content/pagination/CustomPagination";

const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
          main: '#fff',
      },
      secondary: {
          main: '#f9002b',
      },
    },
  });

const Search = (props) => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [validate, setValidate] = useState();

    const fetchSearch = async () => {
        try {
            if(searchText === "") {
                return;
            }
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            setContent(data.results);
            setNumberOfPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    const buttonClickHandler = () => {
        if(searchText === "") {
            setValidate(<p className={classes.validate}> Please enter a valid value </p>);
        }
        fetchSearch();     
    };

    const searchInputHandler = (event) => {
        setSearchText(event.target.value);
        setValidate(<p className={classes.validate}></p>);
    };

    const tabChangeHandler = (event, value) => {
        setType(value);
        setPage(1);
    };

    const EnterKeyHandler = (event) => {
        if (event.key === 'Enter') {
            if(searchText === "") {
                setValidate(<p className={classes.validate}> Please enter a valid value </p>);
            }
            fetchSearch();
        }
    }

    return (
        <div className="page-container">
            <h1 className="page-title"><span className="page-title-span">Search</span> for Movies and TV Shows</h1>
            <ThemeProvider theme={darkTheme}>
                <div className="search-container">
                    <TextField label="Search" variant="outlined" className="search-field" onChange={searchInputHandler} onKeyDown={EnterKeyHandler} />
                    <Button className="search-button" variant="contained" style={{marginLeft: "0.7rem"}} onClick={buttonClickHandler}><IoSearch className="search-svg"/></Button>
                    {validate}
                </div>
                <hr className={classes.hr1} />
                <div className="tabs-container">
                    <Tabs value={type} indicatorColor='secondary' textColor='primary' onChange={tabChangeHandler} aria-label="disabled tabs example">
                        <Tab style={{fontFamily: "inherit", fontSize: "1rem", letterSpacing: "0.1rem"}} label="Search Movies" />
                        <Tab style={{fontFamily: "inherit", fontSize: "1rem", letterSpacing: "0.1rem"}} label="Search TV Shows" />
                    </Tabs>
                </div>
            </ThemeProvider>
            <div className={classes.container}>
                {content && content.map((item) => {
                    return <ContentItem key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name} 
                    date={item.release_date || item.first_air_date} mediaType={type? 'tv' : 'movie'} rating={item.vote_average} language={item.original_language} />;
                })}
            </div>
                {numberOfPages > 1 && (<CustomPagination setPage={setPage} numberOfPages={numberOfPages} />)}
        </div>
    );
};

export default Search;