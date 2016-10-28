import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EditCarStateToProps, EditCarDispatchToPropsBinding} from "./EditCar.bindings";
import CarForm from 'dealer/private/car-form/CarForm.container';

@connect(EditCarStateToProps, EditCarDispatchToPropsBinding)
export default class EditCar extends Component {
  componentDidMount() {
    this.props.selectBrand(this.props.vehicle.brand);
    this.props.selectModel(this.props.vehicle.model);
  }

  updateCar(car) {
    car.id = this.props.params.vehicleId;
    this.props.updateCar(car);
  }

  render() {
    let vehicle = this.props.vehicle;
    let options = {
      fuel: vehicle.vehicle.fuelTypeToDisplay,
      trans: vehicle.vehicle.transmission,
      doors: vehicle.vehicle.numberOfDoorsToDisplay
    };

    let initialValues = {
      engine: vehicle.vehicle,
      color: vehicle.color,
      extras: vehicle.extras,
      pvp: vehicle.price.pvp,
      cash: vehicle.price.cash,
      discount: vehicle.price.discount
    };

    return (
      <div>
        {this.props.loaded && <CarForm ref="CarForm" {...this.props} initialValues={initialValues} predefinedOptions={options} submitForm={::this.updateCar} />}
      </div>
    )
  }
}
