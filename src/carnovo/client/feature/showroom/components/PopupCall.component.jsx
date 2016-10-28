import React, {Component} from 'react';

export default class PopupCall extends Component {
    render() {
        return (
            <div className="popup popup-call">
                <div className="container-popup">
                    <div className="close-btn"><i className="ic-close" onClick={event=>this.props.hidePopupCall()}></i>
                    </div>
                    <div className="body">
                        <div className="main-title">Contacta con Guillem
                            de Volvo Ronda 15 Barcelona
                        </div>
                        <div className="normal-title">Tu ID de oferta es <span className="offer-id">16/92390</span>
                        </div>
                        <button className="btn call" > Llama al 938 940
                            606
                        </button>
                    </div>
                    <hr />
                    <div className="footer-popup">
                        <i className="ic-phone" />
                        <span className="footer-title">También puedes <span onClick={event=>this.props.showPopupMessage()}>solicita una llamada</span></span>
                    </div>
                </div>
            </div>
        )
    }
}