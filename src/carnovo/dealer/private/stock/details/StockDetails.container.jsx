import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StockDetailsStateToPropsBinding, StockDetailsDispatchToPropsBinding} from './StockDetails.bindings';
import DetailsFooter from './Component/DetailsFooter.component';
import DetailsPrice from './Component/DetailsPrice.component';
import {browserHistory} from 'react-router';
import VehicleDetailsBox from '../../../../widgets/VehicleDetailsBox.component';
import EasyTitle from '../../../../shared/components/EasyComponents/EasyTitle.component'

let PriceComponent = (price) => {
  return <DetailsPrice price={price}/>;
};

@connect(StockDetailsStateToPropsBinding, StockDetailsDispatchToPropsBinding)
export default class StockDetails extends Component {

  componentWillMount() {
    this.props.unsetNew();
  }

  navigateTo = (path) => {
    browserHistory.push(process.env.PUBLIC_PATH + path);
  };

  deleteCar(carId) {
    this.props.deleteCar(this.props.token, carId);
  }

  render() {
    let car = this.props.car(this.props.params.vehicleId);
    console.log("AAAA", car);
      return (
        <div>
          <EasyTitle title="Catálogo de coches en stock"
                     button={{label:"Añadir nuevo", position: "right small", href: '/dealer/stock/add-car'}}/>

          <div className="grid stockDetails opodetail" id="stock-details">
            <div id="nav-stock" className="grid">
              <div id="nav-title" className="col-1-2">Detalles</div>
              <div id="nav-items" className="col-1-2">
                <div className="grid">
                  {
                    car.nextId?<div id="nav-next" className="col-1-5 right-strong" onClick={()=>this.navigateTo('dealer/stock/' + car.nextId)}>Siguiente</div>
                      :""
                  }
                  {
                    car.previousId?<div id="nav-previous" className="col-1-5 right-strong" onClick={()=>this.navigateTo('dealer/stock/' + car.previousId)}>Anterior</div>
                      :""
                  }
                </div>
              </div>
            </div>
            <div className="grid box">
              <div className="col-1-2 preview" style={{backgroundImage: "url('" + car.photoUrl + "')", minHeight: '500px'}}></div>
              <div className="col-1-2">
                <VehicleDetailsBox car={car} PriceComponent={PriceComponent(car.price)}/>
              </div>
              <div className="grid footer">
                <DetailsFooter deleteCar={::this.deleteCar} onSubmit={this.navigateTo} vehicleId={this.props.params.vehicleId} />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
