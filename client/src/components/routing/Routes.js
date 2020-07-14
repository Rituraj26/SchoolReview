import React, { useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Schools from '../schools/Schools';
import SchoolDetails from '../school/SchoolDetails';
import Reviews from '../reviews/Reviews';
import Dashboard from '../dashboard/Dashboard';

import PrivateRoutes from './PrivateRoutes';

const Routes = () => {
    return (
        <section className="container-fluid">
            <Alert />
            <Switch>
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/auth/login" component={Login} />
                <Route
                    exact
                    path="/auth/forgotPassword"
                    component={ForgotPassword}
                />
                <Route
                    exact
                    path={`/auth/resetPassword/:resetToken`}
                    component={ResetPassword}
                />
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
                <PrivateRoutes path="/dashboard" component={Dashboard} />
            </Switch>
        </section>
    );
};

export default Routes;
