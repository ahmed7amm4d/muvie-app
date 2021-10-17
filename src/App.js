import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Search from "./pages/Search";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Landing />
                </Route>
                <Route path='/trending'>
                    <Trending />
                </Route>
                <Route path='/movies'>
                    <Movies />
                </Route>
                <Route path='/shows'>
                    <Shows />
                </Route>
                <Route path='/search'>
                    <Search />
                </Route>
            </Switch>
        </Layout>
    );
};

export default App;