import React, {Component} from 'react';
import {browserHistory} from 'react-router'

export default class Row extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmDelete: false
    }
  }

  toDetails(id){
    browserHistory.push(process.env.PUBLIC_PATH + 'dealer/stock/' + id);
  }

  toEdit(id) {
    browserHistory.push(process.env.PUBLIC_PATH + 'dealer/stock/' + id + '/edit');
  }

  toDeleteConfirm() {
    this.setState({confirmDelete: !this.state.confirmDelete})
  }

  render() {
    return(
        <tr onClick={()=>this.toDetails(this.props.content.id)} className={this.props.content.isNew ? 'content-row active' : 'content-row'}>
          <td>{this.props.content.vehicle.makeNameToDisplay}</td>
          <td>{this.props.content.vehicle.modelNameToDisplay}</td>
          <td>{this.props.content.vehicle.numberOfDoorsToDisplay}</td>
          <td>{this.props.content.vehicle.transmission}</td>
          <td>{this.props.content.vehicle.fuelTypeToDisplay}</td>
          <td>
            {
              !!this.props.content.color ? this.props.content.color.optionName :""
            }
          </td>
          <td className="col-extras">
            <div className={this.props.content.extras.length ? "catalog-tooltip" : ""}>{this.props.content.extras.length} ext.
              <span className="catalog-tooltiptext">{this.props.content.extras.map((option, i) =>
                <p key={i}>{option.optionName}</p>)}
              </span>
            </div>
          </td>
          <td>{this.props.content.price.pvp.toLocaleString('es-ES')}</td>
          <td>{this.props.content.price.cash.toLocaleString('es-ES')}</td>
          <td>{this.props.content.price.discount.toLocaleString('es-ES')}%</td>
          <td className="action-column" onClick={(event)=>event.stopPropagation()} >
            <div className="action-div">
              <div className="upper-div" onClick={()=>this.toEdit(this.props.content.id)} ><i className="material-icons">create</i> Editar</div>
              <div className="upper-div"><i className="material-icons">content_copy</i> Duplicar</div>
              <div>
                {this.state.confirmDelete ?
                  <div style={{width: "100%", padding: "0 0 0 10px"}} onMouseLeave={::this.toDeleteConfirm}><i className="ic-check-success" onClick={()=>this.props.delete(this.props.content.id)}/><i className="ic-close" onClick={::this.toDeleteConfirm}/> </div> :
                  <div style={{padding: 0}} onClick={::this.toDeleteConfirm}><i className="material-icons">delete</i> Borrar</div>
                }
              </div>
            </div>
          </td>
        </tr>
    )
  }
}
