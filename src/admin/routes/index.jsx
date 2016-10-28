import React from 'react';
import {Route} from 'react-router';
import {
    AdminForm,
    AdminLogout,
    App,
    NotFound,
    Panel
} from 'view/containers';

export default () => {
    return (
        <Route path="admin" component={App}>
            <Route path="login" component={AdminForm}/>
            <Route path="logout" component={AdminLogout}/>
            <Route path="panel" component={Panel}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
};
