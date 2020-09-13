import React,{Suspense,lazy} from 'react';
import {Switch,Route} from 'react-router-dom';
import Loader from './components/loader';
const Login = lazy(() => import('./components/login'));
const SignUP = lazy(() => import('./components/SignUP'));
const Messages = lazy(() => import('./components/Messages'));
const Profile = lazy(() => import('./components/Profile'));


const routes = () => (
    <Suspense fallback={<Loader/>}>
        <Switch>
            <Route exact='/login' component={Login}/>
            <Route exact='/signup' component={SignUP}/>
            <Route exact='/messages' component={Messages}/>
            <Route exact='/Profile' component={Profile}/>
        </Switch>
    </Suspense>
)

export default routes;