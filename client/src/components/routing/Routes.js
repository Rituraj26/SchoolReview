import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Schools from '../schools/Schools';
import SchoolDetails from '../school/SchoolDetails';
import Reviews from '../reviews/Reviews';
import Dashboard from '../dashboard/Dashboard';

const Routes = () => {
    return (
        <section className="container-fluid">
            <Alert />
            <Switch>
                <Route exact path="/auth/register" component={Register} />
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
    );
};

export default Routes;
