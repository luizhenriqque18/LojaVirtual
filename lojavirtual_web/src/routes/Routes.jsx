import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Main from '../pages/Main.jsx';
import List from '../pages/List.jsx';

class Routes extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/loja' component={List} />
            </Switch>
        )
    }
}

export default Routes;
