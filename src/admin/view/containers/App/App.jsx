import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import Header from 'view/components/header';
import Footer from 'view/components/footer';
import UserErrors from 'view/components/errors/errors';
import {AppPropsBindings, AppDispatchBindings} from './AppBindings';

export class App extends Component {
    render() {
        return (
            <div id="app">
                <Helmet {...config.app.head}/>
                <div id="wrapper">
                    <div id="container">
                        <Header auth={this.props.auth}/>

                        <div className="children">
                            {this.props.errors.length!=0 ? <UserErrors resetErrors={this.props.resetErrors} errors={this.props.errors} /> : null}
                            {this.props.children}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default connect(AppPropsBindings, AppDispatchBindings)(App);
