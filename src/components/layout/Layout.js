import React from "react";

import './Layout.css';
import Header from "./Header";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <main className="main">
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default Layout;