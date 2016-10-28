import React, {Component} from 'react'

export default class NewConfigurationBlock extends Component {
  render() {
    return (
      <div className="col-md-4 padding-right-0">
        <div className="col-md-12 content create-new no-padding">
          <div className="main-new">
            <div className="circle" onClick={()=>this.props.performCreateNew()}><i className="ic-mark-plus"></i>
            </div>
            <h3>Crear nueva configuración</h3>
          </div>
        </div>
      </div>
    )
  }
}
