import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Schools from './components/schools/Schools';
import SchoolDetails from './components/school/SchoolDetails';
import Reviews from './components/reviews/Reviews';
import Dashboard from './components/dashboard/Dashboard';

import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Importing css
import './resources/css/bootstrap.css';
import './resources/css/App.css';

if (localStorage.token) {
}

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container-fluid">
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path="/auth/register"
                                component={Register}
                            />
                            <Route exact path="/auth/login" component={Login} />
                            <Route exact path="/schools" component={Schools} />
                            <Route
                                exact
                                path="/schools/:schoolId"
                                component={SchoolDetails}
                            />
                            <Route
                                exact
                                path="/schools/:schoolId/reviews"
                                component={Reviews}
                            />
                            <Route path="/dashboard" component={Dashboard} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
