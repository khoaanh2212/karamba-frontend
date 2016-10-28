import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import Notifications from 'react-notification-system-redux';
import Row from './component/Row.component';
import NoStockCars from './component/NoStockCars.component';
import EasyTitle from '../../../shared/components/EasyComponents/EasyTitle.component'

import {
  StockCatalogStateToPropsBinding,
  StockCatalogDispatchToPropsBinding
} from "./StockCatalog.bindings";

let Th = ({stateOrder, label, field, identity, toggleSort}) => {
  let icon = stateOrder.field === field && stateOrder.order ? 'expand_less' : 'expand_more';

  return (
    <th className={stateOrder.field === field ? "th-order active" : "th-order"}
        onClick={() => toggleSort(field, identity)}>
      {label}
      <span>
        <i className="material-icons">{icon}</i>
      </span>
    </th>
  );
};

@connect(StockCatalogStateToPropsBinding, StockCatalogDispatchToPropsBinding)
export default class StockCatalog extends Component {
  constructor() {
    super();
    this.state = {
      brand: '',
      sort: {field: '', order: ''}
    };
  }

  checkNotifications() {
      if (this.props.newCar && this.props.notificationStatus == true) {
          this.showInfo(<div><strong>Nuevo vehículo añadido.</strong> Se ha añadido un nuevo coche en el catálogo de coches en stock.</div>)
          let status = false;
          this.props.offNotification(status);
      }
  }
  
  toggleSort(field, identity) {
    this.setState({sort: {field: field, order: !this.state.sort.order, identity: identity}});
  }

  deleteCar(carId) {
    this.props.deleteCar(this.props.token, carId);
  }

  showInfo(message) {
    let notificationOpts = {
      message: message,
      position: 'bc',
      autoDismiss: 2
    };

    this.props.toast(Notifications.info(notificationOpts));
  }

  render() {
    let stock = this.props.stock(this.state.brand, this.state.sort);
    this.checkNotifications();
    return (
      <div id="catalog">
        <Helmet {...config.app.head}/>
        <div>
          <EasyTitle title="Catálogo de coches en stock"
                     button={{label:"Añadir nuevo", position: "right small", href: '/dealer/stock/add-car'}}/>
          <div className="carnovo-row">
            <div className="carnovo-block filter-title">
              Filtrar por marca:
            </div>
            <div className="carnovo-block filter-brand">
              <select className="carnovo-select" default="default"
                      onChange={event => this.setState({brand: event.target.value})}>
                <option className="default-option" value="">Todas</option>
                {this.props.brands.map((option, i) =>
                  <option key={i} value={option.name}>{option.name}</option>)}
              </select>
            </div>
          </div>
          {stock.length === 0 ?
            <NoStockCars/>
            :
            <div className="carnovo-row">
              <div className="easy-table">
                <table>
                  <thead>
                  <tr>
                    <Th stateOrder={this.state.sort} label="Marca" field="brand" toggleSort={::this.toggleSort}
                        identity={(el) => el.vehicle.makeNameToDisplay}/>
                    <Th stateOrder={this.state.sort} label="Modelo" field="model" toggleSort={::this.toggleSort}
                        identity={(el) => el.vehicle.modelNameToDisplay}/>
                    <Th stateOrder={this.state.sort} label="Puertas" field="doors" toggleSort={::this.toggleSort}
                        identity={(el) => el.vehicle.numberOfDoorsToDisplay}/>
                    <Th stateOrder={this.state.sort} label="Trans." field="trans" toggleSort={::this.toggleSort}
                        identity={(el) => el.vehicle.transmission}/>
                    <Th stateOrder={this.state.sort} label="Comb." field="comb" toggleSort={::this.toggleSort}
                        identity={(el) => el.vehicle.fuelTypeToDisplay}/>
                    <Th stateOrder={this.state.sort} label="Color" field="color" toggleSort={::this.toggleSort}
                        identity={(el) => !!el.color ? el.color.optionName : "" }/>
                    <Th stateOrder={this.state.sort} label="Extras" field="extras" toggleSort={::this.toggleSort}
                        identity={(el) => el.extras}/>
                    <Th stateOrder={this.state.sort} label="PVP" field="pvp" toggleSort={::this.toggleSort}
                        identity={(el) => el.price.pvp}/>
                    <Th stateOrder={this.state.sort} label="Precio" field="price" toggleSort={::this.toggleSort}
                        identity={(el) => el.price.cash}/>
                    <Th stateOrder={this.state.sort} label="Dto." field="dto" toggleSort={::this.toggleSort}
                        identity={(el) => el.price.discount}/>
                    <th>&nbsp;</th>
                  </tr>
                  </thead>
                  <tbody>
                  {stock.map((option, i) => <Row key={i} content={option} delete={::this.deleteCar}/>)}
                  </tbody>
                </table>

              </div>
            </div>
          }
      </div>
      </div>
    );
  }
}
