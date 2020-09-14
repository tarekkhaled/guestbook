 import React,{Suspense,lazy} from 'react';
import {Switch,Route} from 'react-router-dom';
import Loader from './components/loader';
const Login = lazy(() => import('./components/login'));
const SignUP = lazy(() => import('./components/signup'));
const Home = lazy(() => import('./components/home'));
const Profile = lazy(() => import('./components/profile'));
const Update = lazy(() => import('./components/update'));


const routes = () => (
    <Suspense fallback={<Loader/>}>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUP}/>
            <Route exact path='/Profile' component={Profile}/>
            <Route exact path='/update/message/:id' component={Update}/>
        </Switch>
    </Suspense>
)

export default routes;