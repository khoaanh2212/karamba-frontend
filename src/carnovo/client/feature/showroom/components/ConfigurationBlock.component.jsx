import React, {Component} from 'react'
import ColorMap from '../../../../shared/utils/ColorMap';
import {browserHistory} from 'react-router'

let ConfirmBlock = ({toggleConfirm, performDelete}) => {
  return (
    <div className="col-md-4 padding-right-0">
      <div className="col-md-12 content no-padding del-confirm">
        <div className="box-close"><i className="ic-close" onClick={() => toggleConfirm()}/></div>
        <div className="txt-confirm"> Estás seguro que deseas eliminar esta configuración? </div>
        <div className="btn-group">
          <button className="btn btn-md btn-default btn-confirm" onClick={() => performDelete(true)}> Eliminar </button>
          <button className="btn btn-md btn-default btn-confirm" onClick={() => performDelete(false)}> Cancelar </button>
        </div>
      </div>
    </div>
  )
};

let ExtraDetailsBlock = ({appliance, performShowHideDetail}) => {
  return (
    <div className="col-md-4 padding-right-0">
      <div className="col-md-12 content no-padding extras">
        <div className="box-close"><i className="ic-close" onClick={()=>performShowHideDetail()}></i></div>
        <div className="extra-details">
          <div className="title">{appliance.extrasName.length + " extras"}</div>
          <ul className="list-extra ul-default">
            {
              _.map(appliance.extrasName, (extra, key) => {
                return (
                  <li className="item" key={key}>{extra}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

let ConfigurationDetailsBlock = ({appliance, toggleConfirm, performShowHideDetail}) => {
  let clickHandler = (id) => {
    browserHistory.push(process.env.PUBLIC_PATH + 'client/showroom/' + id)
  };
  return (
    <div className="col-md-4 padding-right-0">
      <div className="col-md-12 content no-padding">
        <div className="car-image" style={{backgroundImage: "url('" + appliance.photo + "')"}}>
          <div className={((!appliance.numberOfOffers || appliance.numberOfOffers === 0) ? "hidden " : "") + "offer"} style={{cursor: "pointer"}} onClick={(e) => clickHandler(appliance.id)}>
            <span>{appliance.numberOfOffers + " nuevas ofertas"}</span>
          </div>
          <div className="ic-recycle-bin" onClick={() => toggleConfirm()}></div>
          <div className="car-info">
            <span className="brand">{appliance.brand}</span>
            <span className="model">{appliance.model}</span>
            <span className="release">{appliance.createdDate}</span>
          </div>
        </div>
        <div className="option">
          <div className="full-name">{appliance.packageName}</div>
          <div className="option-details">
            <div>{appliance.extrasName}</div>
            <span className="extra">{appliance.extrasName.length + " extras"}</span>
          </div>
          <div className={"color-circle " + ColorMap(appliance.color)}></div>
        </div>
        <div className="number-offer">
          <span className="title-offer">Ofertas recibidas</span>
          <span className="number">{appliance.numberOfNewOffers}</span>
        </div>
        <div className="car-in-stock">Ver coches similares en stock</div>
        <div className="view-details">
          <button className="btn btn-md btn-success" onClick={() => performShowHideDetail()}>Ver detalles</button>
        </div>
      </div>
    </div>
  );
};

export default class ConfigurationBlock extends Component {
  state = {
    showExtra: false,
    showDeleteConfirm: false
  };

  onShowHideDetail() {
    this.setState({
      showExtra: !this.state.showExtra
    });
  }

  toggleConfirmDelele() {
    this.setState({
      showDeleteConfirm: !this.state.showDeleteConfirm
    });
  }

  toDelete(isConfirmed) {
    if (isConfirmed) {
      this.props.deleteAppliance(this.props.appliance.id);
    }
    this.toggleConfirmDelele()
  }

  render() {
    let appliance = this.props.appliance;
    return (
      this.state.showDeleteConfirm ?
        <ConfirmBlock toggleConfirm={::this.toggleConfirmDelele} performDelete={::this.toDelete}></ConfirmBlock>
        : this.state.showExtra ? <ExtraDetailsBlock appliance={appliance}  performShowHideDetail={this.onShowHideDetail.bind(this)}></ExtraDetailsBlock>
        : <ConfigurationDetailsBlock appliance={appliance} toggleConfirm={::this.toggleConfirmDelele} performShowHideDetail={this.onShowHideDetail.bind(this)}></ConfigurationDetailsBlock>
    )
  }
}
