import React, {Component} from 'react';
import EasyButton from 'shared/components/EasyComponents/EasyButton.component';

export default class DetailsFooter extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmDelete: false
    }
  }

  toDeleteConfirm() {
    this.setState({confirmDelete: !this.state.confirmDelete});
  }

  render() {
    return(
      <div>
        <div className="col-1-2">
          <EasyButton label="Borrar" onSubmit={::this.toDeleteConfirm} position="left"/>
        </div>
        <div className="col-1-4">
          <EasyButton label="Editar" onSubmit={()=>this.props.onSubmit('dealer/stock/' + this.props.vehicleId + "/edit")} position="center"/>
        </div>
        <div className="col-1-4">
          <EasyButton label="Volver" onSubmit={()=>this.props.onSubmit('dealer/stock')} position="center"/>
        </div>

        {this.state.confirmDelete ?
          <div className="shadow">
            <div className="confirm-wrapper col-md-3">
              <i className="toggle-delete ic-close" onClick={::this.toDeleteConfirm}/>
              <div className="title">
                <span>Confirma que desea eliminarlo?</span>
              </div>
              <div className="col-1-1">
                <EasyButton label="Eliminar" onSubmit={()=>this.props.deleteCar(this.props.vehicleId)} position="center"/>
              </div>
              <div className="col-1-1">
                <EasyButton label="Cancelar" onSubmit={::this.toDeleteConfirm} position="center"/>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}
