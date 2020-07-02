import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing components
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
    return (
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Switch>
                        <Route
                            exact
                            path="/auth/register"
                            component={Register}
                        />
                        <Route exact path="/auth/login" component={Login} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};

export default App;
