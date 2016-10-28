import React from 'react';
import {connect} from 'react-redux';
import AdminLoginForm from '../../components/loginForm';
import {LoginPropsBindings, LoginDispatchBindings} from './LoginFormBindings';

export class AdminLogin extends React.Component {
    render() {
        const {onSubmit, auth} = this.props;

        return (
            <AdminLoginForm onSubmit={onSubmit} auth={auth} />
        );
    }
}

export default connect(LoginPropsBindings, LoginDispatchBindings)(AdminLogin);
