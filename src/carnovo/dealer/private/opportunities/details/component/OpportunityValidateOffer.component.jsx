import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import EasyButton from 'shared/components/EasyComponents/EasyButton.component';
import InputWrapper from 'shared/utils/InputWrapper';
import {browserHistory} from 'react-router';

@reduxForm({
  form: 'make-offer',
  fields: ['cashPrice', 'financePrice', 'stock', 'message'],
  initialValues: {stock: true}
})
export default class OpportunityValidateOffer extends Component {

  defaultState = {
    price: '-',
    perc: '-',
    number: '',
    displayPvp: ''
  };

  state = {
    cash: this.defaultState,
    finance: this.defaultState,
    message: '',
    isDisabled: true
  };

  componentWillMount() {
    let makingOffer = this.props.makingOffer;
    if (makingOffer) {
      this.onValueChange('cash', 'cashPrice', this.props.recommendedPrice, makingOffer.cashPrice);
      this.onValueChange('finance', 'financePrice', makingOffer.cashPrice, makingOffer.financePrice);
      this.setState({message: makingOffer.message, isDisabled: false});
    }
    this.props.fields['stock'].onChange(this.props.instock);
  }

  validateOffer(offer) {
    this.props.validateOffer({...offer, ...this.state});
  }

  onValueChange(type, propType, maxValue, newValue) {
    if (isNaN(parseFloat(maxValue)))
      maxValue = this.props.recommendedPrice - 1;

    let pvp = newValue;
    if(isNaN(pvp)) return;

    type === 'cash'
      ? this.validateForm({number: +newValue}, this.state.finance, this.state.message)
      : this.validateForm(this.state.cash, {number: +newValue}, this.state.message);

    if (parseFloat(pvp) > parseFloat(maxValue)){
      pvp = maxValue - 1;
    }

    this.props.fields[propType].onChange(pvp);

    if (pvp.length <= 0) {
      this.setState(
        {[type]: this.defaultState});
      return;
    }

    let price = Math.round((this.props.pvp - pvp) * 100) / 100;
    let perc = Math.round(((this.props.pvp - pvp) / this.props.pvp * 100) * 100) / 100;

    this.setState({[type]: {price, perc, number: +pvp, displayPvp: pvp}});
    if (type == 'cash' && this.state.finance.displayPvp != '') {
      this.setState({
        finance: this.defaultState
      });
    }
  }

  changeState(type, propType, maxValue, e) {
    this.onValueChange(type, propType, maxValue, e.target.value);
  }

  handleChangeMessage(e) {
    this.validateForm(this.state.cash, this.state.finance, e.target.value);
    this.setState({message: e.target.value});
  }

  validateForm(cash, finance, message) {
    this.setState({
      isDisabled: (finance.number > 0 && cash.number < finance.number) || (!cash.number || !message)
    });
  }

  render() {
    let {fields: {cashPrice, financePrice, stock, message}, handleSubmit} = this.props;
    let changeCashState = this.changeState.bind(this, 'cash', 'cashPrice', this.props.recommendedPrice);
    let changeFinanceState = this.changeState.bind(this, 'finance', 'financePrice', this.state.cash.displayPvp);
    let disabled = (this.props.instock) ? "":"disabled";
    return (
      <form>
        <div className="opportunityMakeOffer">
          <h3>Realizar oferta</h3>
          <div className="grid">
            <div className="col-1-2">
              <div className="content">
                <h4>Al contado</h4>
                <div className="inputPrice">
                  <input {...InputWrapper(cashPrice)} onChange={changeCashState} type="text" value={this.state.cash.displayPvp}/>
                </div>
                <div className="details">
                  <span>{this.state.cash.price} € descuento</span>
                  <span>{this.state.cash.perc} % de ahorro</span>
                </div>
              </div>
            </div>
            <div className="col-1-2">
              <div className="content">
                <h4>Financiado</h4>
                <div className="inputPrice">
                  <input {...InputWrapper(financePrice)} onChange={changeFinanceState} type="text" value={this.state.finance.displayPvp}/>
                </div>
                <div className="details opacity">
                  <span>{this.state.finance.price} € descuento</span>
                  <span>{this.state.finance.perc} % de ahorro</span>
                </div>
              </div>
            </div>
            <div className="col-1-1">
              <div className="content stockSwitch clearfix">
                <h4>Coches similares en stock
                  <small>(Los coches similares coinciden en marca y modelo)</small>
                </h4>
                <div className="uiswitch-container">
                  <label>
                    <input {...InputWrapper(stock)} type="checkbox" disabled={disabled} className="uiswitch"/>
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-1-1">
              <div className="content">
                <h4>Mensaje</h4>
                <textarea {...InputWrapper(message)} onChange={::this.handleChangeMessage} value={this.state.message} placeholder="Escribe aquí tu mensaje..." name="msg" id="msg" cols="30" rows="10"/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-1 validateOfferContainer">
          <EasyButton position="left" label="Atrás" onSubmit={(e) => {e.preventDefault(); browserHistory.goBack()}}/>
          <EasyButton position="right btn btn-default" label="Validar oferta" disabled={this.state.isDisabled} onSubmit={handleSubmit(::this.validateOffer)}/>
        </div>
      </form>
    )
  }
};
