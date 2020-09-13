import React,{Suspense,lazy} from 'react';
import {Switch,Route} from 'react-router-dom';
import Loader from './components/loader';
const Login = lazy(() => import('./components/login'));
const SignUP = lazy(() => import('./components/signup'));
const Messages = lazy(() => import('./components/messages'));
const Profile = lazy(() => import('./components/profile'));


const routes = () => (
    <Suspense fallback={<Loader/>}>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUP}/>
            <Route exact path='/messages' component={Messages}/>
            <Route exact path='/Profile' component={Profile}/>
        </Switch>
    </Suspense>
)

export default routes;