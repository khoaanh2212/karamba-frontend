import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import RegisterProgressBar from "../components/RegisterProgressBar.component";
import RegisterHeader from "../components/RegisterHeader.component";
import Colors from "./components/Colors.component";
import Extras from './components/Extras.component';
import {SelectColorPropsBinding, SelectColorDispatchBinding} from './SelectColor.bindings';

@connect(SelectColorPropsBinding, SelectColorDispatchBinding)
export default class SelectColor extends Component {
  constructor() {
    super();
    this.state = {
      step: 3,
      optionsPrice: 0,
      colorPrice: 0,
      firstLoadExtras: true,
      firstLoadColors: true,
      showExtras: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) {
      this.setState({
        firstLoadExtras: true,
        firstLoadColors: true
      });
      this.props.resetReloadExtras();
    }
  }

  componentWillMount() {
    this.props.fetchExtras(null, this.props.params.vehicleId, this.props.params.packageId);
  }

  onBack() {
    if (this.props.hasPackages) {
      browserHistory.goBack();
    } else {
      browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-car/' + this.props.carAppliance.brand + '/' + this.props.carAppliance.model);
    }
  }

  changeSelectedExtras(extra) {
    let totalPrice = this.state.optionsPrice;
    if (extra.selected)
      totalPrice = totalPrice + extra.price;
    else
      totalPrice = totalPrice - extra.price;

    this.props.selectExtras(extra.optionId);
    this.setState({
      optionsPrice: this.roundPrice(totalPrice)
    });
  }

  roundPrice(price) {
    if (price < 0)
      return 0;
    return Math.round(price * 100) / 100
  }

  changeSelectedColor(color) {
    this.props.selectColor(color.optionId);
    this.setState({
      colorPrice: color.price
    });
  }

  extrasContentLoaded() {
    this.setState({
      firstLoadExtras: false
    })
  }

  colorsContentLoaded() {
    this.setState({
      firstLoadColors: false
    })
  }

  showExtras() {
    this.setState({
      showExtras: true
    });
  }

  onNext() {
    if (!this.props.isLogged) {
      browserHistory.push(process.env.PUBLIC_PATH + 'car-register/post-code');
    } else {
      this.props.createAppliance(this.props.token, this.props.carAppliance);
    }
  }

  render() {
    let summaryPrice = this.roundPrice(this.state.optionsPrice + this.state.colorPrice);
    return (
      <div id="register-car" className="container-fluid no-padding">
        <div className="container">
          <RegisterProgressBar step={this.state.step}/>
        </div>
        <RegisterHeader header="Selecciona tu color favorito" subHeader="Puedes editar la selección, o configurar otro coche más tarde."/>
        <div className="body container">
          <Colors colors={this.props.colors} changeSelectedColor={::this.changeSelectedColor}
                  firstLoadColors={this.state.firstLoadColors} clearFirstLoad={::this.colorsContentLoaded}/>
        </div>
        <Extras extras={this.props.extras} model={this.props.carAppliance.model} changeSelectedExtras={::this.changeSelectedExtras}
                firstLoadExtras={this.state.firstLoadExtras}
                clearFirstLoad={::this.extrasContentLoaded}
                showExtras={this.state.showExtras}/>
        {this.state.showExtras ? <div className="pricing">
          <h2 className="text-center text-blue">{summaryPrice} €</h2>
          <div className="text-center small">PVP Color + Extras seleccionados</div>
        </div> : ""}
        <div className="footer container">
          <div className="color-picker-footer">
            <button className="btn btn-default btn-trans btn-md" onClick={::this.onBack}>Atrás</button>
            <button className="btn btn-success btn-md pull-right" onClick={::this.onNext}>
              Siguiente
            </button>
            {!this.state.showExtras ?
              <button className="btn btn-default btn-trans btn-md pull-right margin-right-15"
                      style={{width:'305px'}}
                      onClick={this.showExtras.bind(this)}>Añadir extras
              </button> : ""}
          </div>
        </div>
      </div>
    )
  }
}

