import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BookDetail, AuthorDetail } from './Components/ItemDetails/ItemDetails';
import NotFound from './Components/NotFound/NotFound'
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <Switch>
        <Route exact path="/" component={App} />
        <Route path="/BookDetail" component={BookDetail}/>
        <Route path="/AuthorDetail" component={AuthorDetail}/>
        <Route component={NotFound} />
        </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
