import React from "react";

import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";
import classes from './CustomPagination.module.css';

const darkTheme = createTheme({
  palette: {
    type: "dark",
  }
});

function CustomPagination(props) {
  const handlePageChange = (page) => {
    window.scroll(0, 0);
    props.setPage(page);
  };

  return (
    <div className={classes.container}>
      <ThemeProvider theme={darkTheme}>
        <Pagination className={classes.pagination} onChange={(event) => handlePageChange(event.target.textContent)} count={props.numberOfPages} size="large" variant="outlined" shape="rounded" 
        hideNextButton hidePrevButton style={{fontFamily: "inherit"}} />
      </ThemeProvider>
    </div>
  );
};

export default  CustomPagination;