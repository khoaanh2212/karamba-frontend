import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import {map} from 'lodash';
import FormatCurrency from '../../../../shared/utils/FormatCurrency';

export default class ListCar extends Component {
    render() {
        let cars = map(this.props.listCar, (Car, i) => {
            return <div className="well" key={i}>
                <div className="info name-vehicle">
                    <div className="text-bold">{Car.derivativeToDisplay}</div>
                    <span>{Car.fuelTypeToDisplay} / {Car.transmission === "A" || Car.transmission === 'Automático'? 'Automático' : 'Manual'}
                        / {Car.numberOfDoorsToDisplay} puertas</span>
                </div>
                <div className="divine"></div>
                <div className="info">
                    <div className="text-bold">Potencia</div>
                    <span>{!!Car.performance ? Car.performance.maximumPower + " CV" : ""}</span>
                </div>
                <div className="divine"></div>
                <div className="info">
                    <div className="text-bold">PVP</div>
                    <span>a partir de <strong>{FormatCurrency(Car.price)}</strong></span>
                </div>
                <div className="divine"></div>
                <div className="info">
                    <button className="btn btn-success btn-md" onClick={event => {this.props.onSelect(Car.vehicleId)}}>
                        Siguiente
                    </button>
                </div>
            </div>
        });
        return (<div className="list-car">
            {cars}
        </div>);
    }
}
