import React, {Component} from 'react';
import ColorMap from '../../../../../shared/utils/ColorMap';
import FormatCurrency from '../../../../../shared/utils/FormatCurrency';

export default class CarDetail extends Component {
  constructor() {
    super();
    this.state = {
      showExtra: false
    }
  }

  toggleExtras() {
    this.setState({showExtra: !this.state.showExtra})
  }

  render() {
    let {
      brand,
      model,
      motorType,
      transmission,
      numberOfDoors,
      color,
      extras,
      totalPrice
    } = this.props.appliance;
    let pack = this.props.appliance["package"]; // reserved word
    let totalExtrasPrice = (each)=> { let total=0; each.map((ex, i)=>total += ex.price); return total};

    return(
      <div className="detail-wrapper col-md-3">
        <div className="title">
          Ofertas para tu <span> {brand}&nbsp;{model} </span>
        </div>
        <div className="description">
          Comparar ofertas, lee comentarios de concesionarios y distribuidores de contacto para realizar un pedido o hacer cualquier pregunta.
        </div>
        <div className="extras">
          <i className="ic-fuel"/><span> {motorType} </span>
          <i className={"ic-trans" + (transmission == 'A' ? "-a" : "-m")}/><span> {transmission == 'A' ? 'Automático' : 'Manual' } </span>
          <i className="seat-3-icon"/><span> {numberOfDoors} puertas </span>
        </div>
        <div className="infos editions">
          <div className="col-md-9">{pack.name}</div>
          <div className="col-md-3">{FormatCurrency(pack.price)}</div>
        </div>

        {!!color.name ?
          <div className="infos">
            <div className="col-md-9">
              <div className="circle" style={{background: ColorMap(color.name)}}></div>
              {color.name}
            </div>
            <div className="col-md-3">{FormatCurrency(color.price)}</div>
          </div> : null}

        {extras.length > 0 ?
          <div className="infos extra-price" onClick={e=>::this.toggleExtras()}>
            <div className="col-md-9">Extras <i className={"ic-caret-" + (this.state.showExtra ? "up" : "down")}/></div>
            <div className="col-md-3">{FormatCurrency(totalExtrasPrice(extras))}</div>
          </div> : null}

        {this.state.showExtra ? extras.map((extra, i)=>
          <div key={i} className="infos extra-active">
            <div className="col-md-9">{extra.name}</div>
            <div className="col-md-3"> {FormatCurrency(extra.price)}</div>
          </div>) : null}
        <div className="infos price">
          <div className="col-md-9">Precio recomendado</div>
          <div className="col-md-3">{FormatCurrency(totalPrice)}</div>
        </div>
      </div>
    )
  }
}
