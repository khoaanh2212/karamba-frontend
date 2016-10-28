import React, {Component} from 'react';
import SectionSixth from '../client/homepage/SectionSixth.component';

export default class Footer extends Component {
  render() {
    let {
      isHidden,
      onHidePopup
    } = this.props;

    return (
      <footer>
        <SectionSixth isHidden={isHidden} onHidePopup={onHidePopup}/>
        <div className="footer-header container-fluid text-center">
          <img src={require("../theme/img/logo-autohaus.svg")}/>
        </div>

        <div className="footer-content container-fluid">
          <div className="container">
            <div className="col-sm-8 col-md-6">
              <div className="col-xs-6 no-padding">
                <span className="text-bold">Contacto:</span>
                <span className="text-normal">+34 / 902 734 050</span>
                <span className="text-normal">hola@carnovo.com</span>
                <span className="text-bold">Concesionarios</span>
              </div>
              <div className="col-xs-6 no-padding">
                <span className="text-bold">Sobre nosotros</span>
                <span className="text-bold">FAQs</span>
                <span className="text-bold">Equipo</span>
                <span className="text-bold">Trabajo</span>
                <span className="text-bold">Prensa</span>
              </div>
            </div>
            <div className="col-sm-4 col-md-6 text-right">
              <div className="pic"><img src={require("../theme/img/trust-pilot-badge-footer.png")}/></div>
              <div style={{width:'191px', display:'inline-block'}}>9,6/10 en la comunidad de opiniones Trustpilot. <strong>Lee las valoraciones </strong></div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>

        <div className="footer-menu container-fluid">
          <div className="container">
            <div className="col-md-6 col-sm-12 no-padding">
              <span className="text-normal">Síguenos en:</span>
              <span className="icon"><a href="#"><img src={require("../theme/img/icon-facebook.png")}/></a></span>
              <span className="icon"><a href="#"><img src={require("../theme/img/icon-twitter.png")}/></a></span>
            </div>

            <div className="col-md-6 col-sm-12 no-padding text-right">
              <ul className="list-inline">
                <li><a href={process.env.PUBLIC_PATH + 'terms-and-conditions'}>Terms & Conditions</a></li>
                <li><a href={process.env.PUBLIC_PATH + 'privacy-policy'}>Privacy Policy</a></li>
                <li><a href="#">Mapa del sitio</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-last container-fluid">
          <div className="container text-center">
            Carnovo no es un agente comercial, nosotros no vendemos coches sino que te ponemos en contacto con concesionarios para que obtengas la mejor oferta posible. Carnovo no verifica ni respalda estas ofertas ni recomienda qué coche comprar ni bajo qué términos. Carnovo no ofrece ni gestiona financiación. Si compras un coche, lo estarás comprando directamente al concesionario sin que Carnovo participe en la transacción. Nosotros nunca te cobraremos nada, solo cobraremos al concesionario si compras un coche. Carnovo es una marca registrada por Carnovo Digital SL.
          </div>
        </div>
      </footer>
    )
  }
}
