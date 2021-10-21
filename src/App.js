import React from 'react';
import {Container} from '@material-ui/core';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import useStyles from './styles';
import NavBar from './components/NavBar/navbar';
import Home from './components/Home/home';
import Auth from './components/Auth/auth';



const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Container maxWidth={"lg"}>
                <NavBar />
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;