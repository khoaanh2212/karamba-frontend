import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router';
import HeaderLogin from './login.component';
import DealerNavBar from './dealerNavBar.component';

@connect(null, dispatch => ({
  goTo: (resource) => dispatch(push(resource))
}))
export default class Header extends Component {

  backToHomePage(e) {
    this.props.clearSession();
    e.preventDefault();
    const home = this.props.role === 'dealer' ? '/dealer/opportunities' : '/';
    this.props.goTo(home);
  }

  render() {
    return (
      <header>
        <div className="col-xs-1"></div>
        <div className="header-container container col-xs-10">
          <Link to='#' className="logo" onClick={this.backToHomePage.bind(this)}>
            <img src={require("../theme/img/logo.svg")}/>
          </Link>
          {this.props.role === 'dealer' ?
            <DealerNavBar />
            :
            <ul className="link-menu">
              {this.props.isLogged ?
                <li><Link to={process.env.PUBLIC_PATH + "client/showroom"} activeClassName="active">Tu showroom</Link>
                </li> : ""}
              <li><Link to={process.env.PUBLIC_PATH + "busca-coche"} activeClassName="active">Busca coche</Link></li>
              <li><Link to={process.env.PUBLIC_PATH + "como-funciona"} activeClassName="active">¿Cómo funciona?</Link>
              </li>
              <li><Link to={process.env.PUBLIC_PATH + "sobre-nosotros"} activeClassName="active">Sobre nosotros</Link>
              </li>
            </ul>
          }
          <HeaderLogin isLogged={this.props.isLogged} role={this.props.role}/>
        </div>
        <div className="col-xs-1"></div>
      </header>
    )
  }
}
