import React, {Component} from 'react';

export default class VehicleDetailsAdditionalItems extends React.Component {
  state = {
    showExtras : false
  };

  componentWillReceiveProps(nextProps){
    this.setState({showExtras: false});
  }

  toggleShowExtras = () => {
    this.setState({showExtras: !this.state.showExtras});
  };

  render() {
    let car = this.props.car;
    let total = 0;
    if(car.extras.length!==0) {
      car.extras.map(extra=> total += extra.price);
      total = Math.round((total * 100)) / 100;
    }

    return(
      <div>
        <div className={this.state.showExtras ? "grid extras active" : "grid extras"}>
          <div className="action" onClick={()=>this.toggleShowExtras()}>
            <div className="grid" style={{paddingBottom: '10px'}}>
              <div className="col-2-3">
                Extras
                <span className="icon"><i className="material-icons">{this.state.showExtras ? 'expand_less' : 'expand_more'}</i></span>
              </div>
              <div className="col-1-3"><div className="right-strong" style={{position: 'relative', top: '10px'}}>{total != 0 ? `${total.toLocaleString('es-ES')} €` : ""}</div></div>
            </div>
          </div>
          <div id="extras-details">
            {car.extras.map && car.extras.length > 0 && car.extras.map((extra, i)=>
              <div key={i} className="grid option">
                <div className="col-2-3">{extra.optionName}</div>
                <div className="col-1-3 price">{!!extra.price ? `${extra.price.toLocaleString('es-ES')} €` : ""} </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
