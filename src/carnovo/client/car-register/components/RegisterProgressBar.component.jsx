import React, {Component} from 'react'

export default class RegisterProgressBar extends Component {

  render() {
    let progress = "";
    switch (this.props.step) {
      case 1 :
        progress = <ol className="row col-xs-12">
          <li className="col-xs-3 current">
            <div className="progress-bar-label">Marca / Modelo</div>
          </li>
          <li className="col-xs-3">
            <div className="progress-bar-label">Motor / Ajustes</div>
          </li>
          <li className="col-xs-3">
            <div className="progress-bar-label">Opciones / Extras</div>
          </li>
          <li className="col-xs-3 last">
            <div className="progress-bar-label">Compara Ofertas</div>
          </li>
        </ol>;
        break;
      case 2 :
        progress = <ol className="row col-xs-12">
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Marca / Modelo</div>
          </li>
          <li className="col-xs-3 current">
            <div className="progress-bar-label">Motor / Ajustes</div>
          </li>
          <li className="col-xs-3">
            <div className="progress-bar-label">Opciones / Extras</div>
          </li>
          <li className="col-xs-3 last">
            <div className="progress-bar-label">Compara Ofertas</div>
          </li>
        </ol>;
        break;
      case 3 :
        progress = <ol className="row col-xs-12">
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Marca / Modelo</div>
          </li>
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Motor / Ajustes</div>
          </li>
          <li className="col-xs-3 current">
            <div className="progress-bar-label">Opciones / Extras</div>
          </li>
          <li className="col-xs-3 last">
            <div className="progress-bar-label">Compara Ofertas</div>
          </li>
        </ol>;
        break;
      case 4 :
        progress = <ol className="row col-xs-12">
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Marca / Modelo</div>
          </li>
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Motor / Ajustes</div>
          </li>
          <li className="col-xs-3 completed">
            <div className="progress-bar-label">Opciones / Extras</div>
          </li>
          <li className="col-xs-3 current last">
            <div className="progress-bar-label">Compara Ofertas</div>
          </li>
        </ol>;
        break;
      default:
        progress = <ol className="row col-xs-12">
          <li className="col-xs-3">
            <div className="progress-bar-label">Marca / Modelo</div>
          </li>
          <li className="col-xs-3">
            <div className="progress-bar-label">Motor / Ajustes</div>
          </li>
          <li className="col-xs-3">
            <div className="progress-bar-label">Opciones / Extras</div>
          </li>
          <li className="col-xs-3 last">
            <div className="progress-bar-label">Compara Ofertas</div>
          </li>
        </ol>;
    }
    return (
      <div className="configuration-progress">
        <div className="register-progress-bar">
          {progress}
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
