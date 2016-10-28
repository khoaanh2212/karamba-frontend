import React, {Component} from 'react';


export default class EmissionsBoard extends Component {


    render() {
        return (
            <div className="popup-emissions">
                <div className="content">
                    <div className="close-btn"><i className="ic-close" onClick={event=>this.props.hidePopup()}></i>
                    </div>
                    <h3>Eficiencia CO2</h3>
                    <div className="level-element">
                        <div className="element">
                            <span className="arrow-label A-Plus-CO2">
                                <strong className="text float-left">A+</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label A-CO2">
                                <strong className="text float-left">A</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label B-CO2">
                                <strong className="text float-left">B</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                            <span className="arrow-label float-right normal-size">
                                <strong className="text">B</strong>
                                <i className="ic-label-left-arrow icon left-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label C-CO2">
                                <strong className="text float-left">C</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                                <span className="arrow-label D-CO2">
                                    <strong className="text float-left">D</strong>
                                    <i className="ic-label-right-arrow icon right-arrow"></i>
                                </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label E-CO2">
                                <strong className="text float-left">E</strong>
                               <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label F-CO2">
                                <strong className="text float-left">F</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                        <div className="element">
                            <span className="arrow-label G-CO2">
                                <strong className="text float-left">G</strong>
                                <i className="ic-label-right-arrow icon right-arrow"></i>
                            </span>
                        </div>
                    </div>
                    <div className="description">
                        Para obtener más información sobre el oficial de consumo de combustible, los oficiales
                        específicos las emisiones de co2 y el consumo de energía de los coches nuevos puede la "guía
                        sobre el consumo de combustible, la emisión de co2 y el consumo de energía de los coches
                        nuevos"
                        ser eliminado, que en todas las ventas, para el alemán automoción treuhand GmbH (DAT),
                        Hellmuth-hirth calle 1, 73760 ostfildern-scharnhausen, y la virtud de DAT guía gratis está
                        disponible.
                    </div>
                </div>
            </div>
        );
    }
}