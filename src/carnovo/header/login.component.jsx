import React, {Component} from 'react';
import {Link} from 'react-router';
import {loadState, saveState} from 'store/localstorage';
import {browserHistory} from 'react-router';
import UserCertificate from './components/UserCertificate.component';
import NotificationPanel from './components/NotificationPanel.component';

export default class HeaderLogin extends Component {
    constructor() {
      super();
      this.state = {
          showMenu: false,
          showPlan: false,
        showNotify: false,
        newNotify: false
      };
    }

    componentDidMount() {
      let _this = this;
      // DEMO NEW NOTIFICATION COMING
      setTimeout(() => {
        _this.setState({newNotify: true})
      }, 2000)
    }

    toggleMenu(state) {
      this.setState({
          showMenu: !!state
      });
    }

    toggleNotify() {
      this.setState({showNotify: !this.state.showNotify})
    }

    togglePlan() {
      this.setState({showPlan: !this.state.showPlan})
    }

    logout() {
      window.location = process.env.PUBLIC_PATH + "user/logout";
    }

    render() {
      let HIDE_MENU_TEMPORARY = true;
      return (
        <div className="menu-wrapper">
          <ul className="login-menu">
            {this.props.isLogged && this.props.role == 'dealer' && !HIDE_MENU_TEMPORARY ?
              <UserCertificate/> : null
            }

            {this.props.isLogged && this.props.role == 'dealer' && !HIDE_MENU_TEMPORARY ?
              <li className="notify" onClick={::this.toggleNotify}>
                <div className={"circle" + (this.state.newNotify ? " new" : "")}>5</div>
                <i className="ic-notify-bell" />
              </li> : null
            }

            {this.props.isLogged ?
              <li className="user-login">
                <Link to={this.props.role == 'dealer' ? (process.env.PUBLIC_PATH + "dealer/profile") : "#"} className="profile-logged" >
                  <i className="ic-user-logged" onMouseOver={(e) => this.toggleMenu(true)} onClick={(e) => this.toggleMenu(false)}/>
                </Link>
                {this.state.showMenu ?
                  <div className="profile-menu">
                    <i className="ic-tangle-up"/>
                    <ul className="menu ul-default">
                      {
                        this.props.role == 'client'? <li onClick={(e)=> browserHistory.push(process.env.PUBLIC_PATH + "client/profile")}>Ajustes</li>:""
                      }
                      {
                        this.props.role == 'dealer'? <li onClick={(e)=> browserHistory.push(process.env.PUBLIC_PATH + "dealer/profile")}>Ver perfil</li>:""
                      }
                      {
                        this.props.role == 'dealer'? <li onClick={(e)=> browserHistory.push(process.env.PUBLIC_PATH + "dealer/profile/edit")}>Editar perfil</li>:""
                      }
                      <li onClick={this.logout.bind(this)}>Cerrar sesión</li>
                    </ul>
                  </div> : null
                }
              </li>
              :
              <li className="user-login">
                <Link to={process.env.PUBLIC_PATH + "client/login"}>
                  <span className="ic-user"/>
                  Login
                </Link>
              </li>
            }
          </ul>
          {this.state.showNotify && !HIDE_MENU_TEMPORARY ?
            <NotificationPanel toggleNotify={::this.toggleNotify}/> : null}
        </div>
      )
    }
}
