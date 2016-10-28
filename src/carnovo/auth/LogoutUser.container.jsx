import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LogoutPropsBingding, LogoutDispatchBingding} from './LogoutUser.bindings.jsx';
import {removeState} from 'store/localstorage';

@connect(LogoutPropsBingding, LogoutDispatchBingding)
export default class LogoutUser extends Component {

    componentWillMount() {
        this.props.clearSession();
    }

    render(){
        return (<div></div>);
    }
}
