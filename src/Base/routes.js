/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {Switch, Route} from 'react-router';

import FallthroughMenu from '../Base/fallthroughMenu';
import Login from '../Components/Login';
import Home from '../Components/Home';
import UserDetail from '../Components/UserDetail';



export default () => (
    <FallthroughMenu>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/users' component={Home}/>
            <Route exact path='/userdetail/' component={UserDetail}/>

        </Switch>
    </FallthroughMenu>
);
