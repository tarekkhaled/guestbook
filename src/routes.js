import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './components/login';
import SignUP from './components/signup';
import Messages from './components/messages';
import Profile from './components/profile';


const routes = () => (
        <Switch>
            <Route exact='/login' component={Login}/>
            <Route exact='/signup' component={SignUP}/>
            <Route exact='/messages' component={Messages}/>
            <Route exact='/Profile' component={Profile}/>
        </Switch>
)

export default routes;