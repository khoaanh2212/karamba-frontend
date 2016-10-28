import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import Header from 'header/Header.component';
import Footer from 'app/Footer.component';
import Notifications from 'react-notification-system-redux';
import style from './toastr.style';
import {AppPropsBindings, AppDispatchBinding} from './App.bindings';
import ScrollToElement from '../shared/utils/ScrollToElement';

@connect(AppPropsBindings, AppDispatchBinding)
export default class App extends Component {

  onClearSession() {
    this.props.clearSession();
  }

  componentDidUpdate() {
    ScrollToElement('#container');
  }

  render() {
    let {
      notifications,
      isLogged,
      role,
      isHidden,
      onHidePopup
    } = this.props;

    return (
      <div id="app">
        <Helmet {...config.app.head}/>
        <div id="wrapper">
          <div id="container">
            <Header isLogged={isLogged} role={role} clearSession={::this.onClearSession}/>
            <div className="children">
              {this.props.children}
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <Notifications notifications={notifications} style={style}/>
        <Footer isHidden={isHidden} onHidePopup={onHidePopup} />
      </div>
    );
  }
}

