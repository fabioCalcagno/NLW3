import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap/OrphanegesMap';


function Routes(){
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/orphanages"  component={OrphanagesMap} />
        </Switch>
    </BrowserRouter>
    );
}

export default Routes;