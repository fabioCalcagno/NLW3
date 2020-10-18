import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap/OrphanegesMap';
import Orphanage from './pages/Orphanage/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage/CreateOrphanage';


function Routes(){
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/app" exact component={OrphanagesMap} />
            <Route path="/orphanages/create"  component={CreateOrphanage} />
            <Route path="/orphanages/:id" exact component={Orphanage} />
        </Switch>
    </BrowserRouter>
    );
}

export default Routes;