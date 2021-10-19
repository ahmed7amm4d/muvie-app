import React from "react";

import classes from './Paginate.module.css';
import Pagination from '@material-ui/lab/Pagination/';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

const Paginate = (props) => {
    const pageChangeHandler = (page) => {
        props.setPage(page);
        window.scroll(0, 0);
    };

    return (
        <div className={classes.pagination}>
            <ThemeProvider theme={darkTheme}>
                <Pagination onChange={event => pageChangeHandler(event.target.textContent)} count={props.pageNumbers} 
                variant="outlined" shape="rounded" size="large" hidePrevButton hideNextButton />
            </ThemeProvider>
        </div>
    );
};

export default Paginate;