import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import ui from 'redux-ui';
import DealerFormRegistration from './components/DealerFormRegistration.component';
import RegisterSuccess from './components/RegisterSuccess.component';
import DealerHomeUi from './DealerHome.uistate';
import {DealerHomeDispatchBindings} from "./DealerHome.bindings";
import ErrorBox from 'shared/components/ErrorBox.component';
import ScrollToElement from "../../shared/utils/ScrollToElement";

@ui(DealerHomeUi)
@connect(null, DealerHomeDispatchBindings)
export default class DealerHome extends Component {
  render() {
    var maxWidth = {width: '200px', marginTop: "15px", padding: "15px"};
    return (
      <div id="dealer-home">
        <Helmet {...config.app.head}/>

        <section className="section-first container-fluid">
          <div className="section-first-inner container text-center">
            <h1>Vende coches de manera inteligente</h1>
            <h4>Únete a los cientos de concesionarios que ya venden a través de Carnovo</h4>
            <div className="col-xs-12 no-padding">
              <div className="row">
                <div className="col-xs-4 col-xs-push-4" onClick={event => {
                  ScrollToElement("#dealer-registration")
                }}>
                  <button className="btn btn-lg btn-success" style={maxWidth}>Regístrate</button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4 col-xs-push-4" onClick={event => this.goToDealerLogin()}>
                  <a href="/dealer/login" className="btn btn-lg btn-border" style={maxWidth}>Login</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-second container-fluid">
          <div className="col-sm-4">
            <div className="text-center icons"><img src={require("../../theme/img/icon-euro.svg")}/></div>
            <h2 className="text-center">Compara las ofertas</h2>
            <p className="text-center">Compara rápidamente nuestras ofertas exclusivas y ahórrate más dinero que incluso
              negociando.</p>
          </div>

          <div className="col-sm-4">
            <div className="text-center icons"><img src={require("../../theme/img/icon-victory.svg")}/></div>
            <h2 className="text-center">Los mejores profesionales</h2>
            <p className="text-center">Concesionarios oficiales cuidadosamente elegidos por nuestro equipo con
              valoraciones de nuestros usuarios.</p>
          </div>

          <div className="col-sm-4">
            <div className="text-center icons"><img src={require("../../theme/img/icon-smile.svg")}/></div>
            <h2 className="text-center">¡Disfruta la experiencia!</h2>
            <p className="text-center">Carnovo te ofrece la mejor experiencia de compra de coche nuevo ahorrándote
              tiempo de una manera simple y sencilla. </p>
          </div>
        </section>

        <section className="section-third container">
          <div className="section-third__item row">
            <div className="col-xs-1"></div>
            <div className="col-xs-8 text">
              <h3>Titulo</h3>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum dolore ducimus eligendi et ipsam iusto laboriosam, laudantium libero nisi non quaerat quam qui repellendus sequi sit tenetur? Aliquam, repudiandae.</span>
            </div>
            <div className="col-xs-2 icon">
              <i className="material-icons">laptop_chromebook</i>
            </div>
          </div>
          <div className="section-third__item row">
            <div className="col-xs-1"></div>
            <div className="col-xs-2 icon">
              <i className="material-icons">verified_user</i>
            </div>
            <div className="col-xs-8 text">
              <h3>Titulo</h3>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum dolore ducimus eligendi et ipsam iusto laboriosam, laudantium libero nisi non quaerat quam qui repellendus sequi sit tenetur? Aliquam, repudiandae.</span>
            </div>
          </div>
          <div className="section-third__item row">
            <div className="col-xs-1"></div>
            <div className="col-xs-8 text">
              <h3>Titulo</h3>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum dolore ducimus eligendi et ipsam iusto laboriosam, laudantium libero nisi non quaerat quam qui repellendus sequi sit tenetur? Aliquam, repudiandae.</span>
            </div>
            <div className="col-xs-2 icon">
              <img className="svg_icon" src={require("../../theme/img/icon-coin-blue.svg")}/>
            </div>
          </div>
        </section>

        <div id="dealer-registration">
          { this.props.ui.registered ?
            <RegisterSuccess /> :
            <DealerFormRegistration onSubmit={this.props.onDealerRegistration}/>
          }
          { this.props.ui.error ? <ErrorBox message={this.props.ui.error}/> : null }
        </div>
      </div>
    );
  }

  goToDealerLogin() {

  }
}
