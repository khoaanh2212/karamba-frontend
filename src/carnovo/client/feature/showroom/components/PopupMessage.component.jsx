import React, {Component} from 'react';

export default class PopupMessage extends Component {
    render() {
        return (
            <div className="popup popup-message">
                <div className="container-popup">
                    <div className="close-btn"><i className="ic-close"
                                                  onClick={event=>this.props.hidePopupMessage()}></i>
                    </div>
                    <div className="body">
                        <div className="main-title">Solicita una llamada a Guillem Sánchez de Volvo Ronda</div>
                        <p>Número de teléfono</p>
                        <input type="text" className="txt-telephone"/>
                        <p>Message <span>(ej. Llámeme entre las 5 pm y las 7 pm)</span></p>
                        <textarea placeholder="Escribe aquí tu mensaje ..." className="txt-message"></textarea>

                        <button className="btn call"> Solicita una
                            llamada
                        </button>
                    </div>
                    <hr />
                    <div className="footer-popup">
                        <i className="ic-phone"/>
                        <span className="footer-title">También puedes<span> solicita una llamada</span></span>
                    </div>
                </div>
            </div>
        )
    }
}