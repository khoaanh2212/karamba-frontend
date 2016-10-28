import React, {Component} from 'react';
import DetailsAdditionalItems from './VehicleDetailsAdditionalItems.component';
import ColorMap from '../shared/utils/ColorMap';
import {connect} from 'react-redux';
import FormatCurrency from '../shared/utils/FormatCurrency';

let VehicleDetailsBoxStateToPropsBinding = (state) => {
  return {
    role: state.auth.role
  };
};

@connect(VehicleDetailsBoxStateToPropsBinding, null)
export default class VehicleDetailsBox extends React.Component {
    render() {
        let car = this.props.car;
        car.vehicle.price = parseFloat(car.vehicle.price);
        let strTime = "";
        if (this.props.role == 'client') {
            let date = new Date(this.props.created);
            let options = {year: 'numeric', month: 'long', day: 'numeric'};
            if (date != 'Invalid Date') {
                strTime = 'Oferta recibida el ' + date.toLocaleDateString('es-ES', options);
            }
        } else if (this.props.role == 'dealer') {
            strTime = car.vehicle.makeNameToDisplay
        }

        return (
            <div id="content-box">
                <div className="upper-content">
                    <div className="title">
                        <span>{`${this.props.role == 'client' ? (car.vehicle.makeNameToDisplay + ' ') : ''}${car.vehicle.modelNameToDisplay}`}</span>
                        <div className={"color-circle " + ColorMap(!!car.color ? car.color.optionName : "")}></div>
                    </div>
                    <div className="sub-title">
                        <span>{strTime}</span>
                        {car.id ? <span className="light">&nbsp; (Ref: {car.id})</span> : null}
                    </div>
                </div>
                <div className="upper-content">
                    <div className="grid option bold">
                        <div className="col-2-3">{car.vehicle.derivativeToDisplay}</div>
                        <div className="col-1-3 price">{FormatCurrency(car.vehicle.price)}</div>
                    </div>

                        <div className="grid option bold">
                            <div className="col-2-3">{car.package?car.package.optionName:""}</div>
                            <div className="col-1-3 price">{car.package? FormatCurrency(car.package.price):""}</div>
                        </div>

                    <div className="grid option">
                        <div className="col-2-3">{car.vehicle.numberOfDoorsToDisplay} puertas</div>
                        <div className="col-1-3"></div>
                    </div>
                    <div className="grid option">
                        <div
                            className="col-2-3">{car.vehicle.transmission === "A" || car.vehicle.transmission === 'Automático' ? 'Automático' : 'Manual'}</div>
                        <div className="col-1-3"></div>
                    </div>
                    <div className="grid option">
                        <div className="col-2-3">{car.vehicle.motorType}</div>
                        <div className="col-1-3"></div>
                    </div>
                    {!!car.vehicle.package && car.vehicle.package.name != "" ?
                        <div className="grid option">
                            <div className="col-2-3">{car.vehicle.package.name}</div>
                            <div
                                className="col-1-3 price">{FormatCurrency(car.vehicle.package.price)}</div>
                        </div>
                        : null
                    }
                    {!!car.color && car.color.optionName != "" ?
                        <div className="grid option">
                            <div className="col-2-3">{car.color.optionName}</div>
                            <div
                                className="col-1-3 price">{FormatCurrency(car.color.price)}</div>
                        </div>
                        : null}
                    <DetailsAdditionalItems car={car}/>
                </div>
                <div id="lower-content">
                    {this.props.PriceComponent}
                </div>
                <div className="details-footer">
                    {this.props.footer}
                </div>
            </div>
        )
    }
}
