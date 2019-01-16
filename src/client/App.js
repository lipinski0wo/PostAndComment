import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/base.scss';

import Navbar from './components/layout/Navbar';
import Popup from './components/layout/Popup';
import AddPostBar from './components/layout/AddPostBar';
import Home from './components/layout/Home';
import Newest from './components/layout/Newest';
import Best from './components/layout/Best';
import Post from './components/layout/Post';
import AddPost from './components/layout/AddPost';

import AuthorizedRoute from './components/authorization/AuthorizedRoute';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Navbar />
                        <Popup />
                        <AddPostBar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/newest" component={Newest} />
                            <Route exact path="/best" component={Best} />
                            <AuthorizedRoute exact path="/addPost" component={AddPost} />
                            <Route exact path="/post/:id" component={Post} />
                        </Switch>

                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}

export default connect(null, {})(App);