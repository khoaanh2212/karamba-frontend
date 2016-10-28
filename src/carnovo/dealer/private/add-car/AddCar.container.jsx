import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarForm from "dealer/private/car-form/CarForm.container";
import EasyTitle from "shared/components/EasyComponents/EasyTitle.component";
import EasySubtitle from "shared/components/EasyComponents/EasySubtitle.component";
import {AddCarDispatchToPropsBinding} from './AddCar.bindings';

@connect(null, AddCarDispatchToPropsBinding)
export default class AddCar extends Component {
  createCar(car) {
    this.props.addCar(car);
  }

  render() {
    return (
      <div id="add-car">
        <EasyTitle title="Añadir coche nuevo"/>
        <EasySubtitle
          text="Configura un nuevo coche para añadirlo al catálogo de coches para los que podrás recibir peticiones de clientes interesados."/>

        <CarForm {...this.props} submitForm={::this.createCar}/>
      </div>
    )
  }
}
