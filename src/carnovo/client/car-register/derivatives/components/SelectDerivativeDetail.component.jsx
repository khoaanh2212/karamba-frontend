import React, {Component} from 'react'

let getSelectedClassName = (derivative, selectedDerivatives) => {
  if (selectedDerivatives) {
    let index = selectedDerivatives.indexOf(derivative);
    if (index > -1) {
      return "selected-filter-type";
    }
  }
  return "";
};

let renderFuelRow = (derivative, params) => {
  return (
    <div className="col-xs-6 filter-type-option-wrapper">
      <div className={"filter-type-icon filter-type-option " + getSelectedClassName(derivative, params.selectedDerivatives)}
           onClick={() => params.onSelectDerivative(derivative, params.type)}>
        <div className="filter-type-icon">
          <i className="ic-fuel"></i>
        </div>
        <div className={"filter-type-option-title " + getSelectedClassName(derivative, params.selectedDerivatives)}>{derivative}</div>
      </div>
    </div>
  );
};

let renderTranRow = (derivative, params) => {
  return(
    <div className="col-xs-6 filter-type-option-wrapper">
      <div className={"filter-type-option " + getSelectedClassName(derivative, params.selectedDerivatives)}
           onClick={() => params.onSelectDerivative(derivative, params.type)}>
        {
          (derivative === "M" || derivative === "Manual")?
            <div className="filter-type-icon">
              <i className="ic-trans-m"></i>
            </div>
            :
            <div className="filter-type-icon">
              <i className="ic-trans-a"></i>
            </div>
        }
        {
          (derivative === "M" || derivative === "Manual") ?
            <span className={"filter-type-option-title " + getSelectedClassName(derivative, params.selectedDerivatives)}>Manual</span>
            :
            <span className={"filter-type-option-title " + getSelectedClassName(derivative, params.selectedDerivatives)}>Automático</span>
        }
      </div>
    </div>
  );
};

let renderDoorRow = (derivative, params) => {
  return(
    <div className="col-xs-6 filter-type-option-wrapper">
      <div className={"filter-type-option " + getSelectedClassName(derivative, params.selectedDerivatives)}
           onClick={() => params.onSelectDerivative(derivative, params.type)}>
        {
          (derivative === "5")?
          <div className="filter-type-icon seat-5-icon"></div>
          :
          <div className="filter-type-icon seat-3-icon"></div>
        }
        <span className={"filter-type-option-title " + getSelectedClassName(derivative, params.selectedDerivatives)} >{derivative}</span>
      </div>
    </div>
  );
};

let Row = ({derivative, params}) => {
  switch (params.type) {
    case "fuels":
      return renderFuelRow(derivative, params);
    case "trans":
      return renderTranRow(derivative, params);
    case "doors":
      return renderDoorRow(derivative, params);
  }
};

let Derivative = ({params}) => {
  return (
    <div className="choose-filters-wrapper">
      <div className="choose-filters-box">
        <div className="row choose-filters">
          <div className="col-xs-1"></div>
          <div className="col-xs-4">
            <div className="filter-type">
              <div className="filter-type-icon">
                <i className={params.iconName}></i>
              </div>
              <div className="filter-type-label">{params.name}</div>
            </div>
          </div>
          <div className="col-xs-6 filter-type-options">
            {
              params.options.map((derivative, i)=>
                <Row key={i} derivative={derivative} params={params}></Row>
              )
            }
          </div>
          <div className="col-xs-1"></div>
        </div>
      </div>
    </div>
  );
};

export default class SelectDerivativeDetail extends Component {

  render() {

    let fuelOption = {
      name: 'Combustible',
      type: 'fuels',
      iconName: 'ic-fuel',
      options: this.props.fuels,
      selectedDerivatives: this.props.selectedDerivatives.fuels,
      onSelectDerivative: this.props.onSelectDerivative
    };

    let tranOption = {
      name: 'Transmisión',
      type: 'trans',
      iconName: 'ic-gear',
      options: this.props.trans,
      selectedDerivatives: this.props.selectedDerivatives.trans,
      onSelectDerivative: this.props.onSelectDerivative
    };

    let doorOption = {
      name: 'Puertas',
      type: 'doors',
      iconName: 'ic-door',
      options: this.props.doors,
      selectedDerivatives: this.props.selectedDerivatives.doors,
      onSelectDerivative: this.props.onSelectDerivative
    };

    return (
      <div className="configuration-content">
        { fuelOption.options ? <Derivative params={fuelOption}></Derivative> : null }
        <div className="seperated"></div>
        { tranOption.options ? <Derivative params={tranOption}></Derivative> :null }
        <div className="seperated"></div>
        { doorOption.options ? <Derivative params={doorOption}></Derivative> :null }
      </div>
    );
  }
}
