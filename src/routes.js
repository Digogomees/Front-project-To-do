import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Todo from './pages/todo';
import User from './pages/users';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={User} />
                <Route path='/todo/:id' component={Todo} />
                
            </Switch>
        </BrowserRouter>
    )
}