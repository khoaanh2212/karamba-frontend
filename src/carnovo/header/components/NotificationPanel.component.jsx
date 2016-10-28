import React, {Component} from 'react';
import {NEW_OPPORTUNITY, NEW_MESSAGE} from '../../dealer/private/opportunities/Opportunities.reducer'

let textForTypes = [
  {type: NEW_OPPORTUNITY, label: "Hay nueva oportunidad disponible para el "},
  {type: NEW_MESSAGE, label: "Tienes un nuevo mensaje de "},
  {type: "call", label: "Tienes una solicitud de llamada de "},
  {type: "new_rating", label: "Tienes una nueva valoración de "}
];

let defaultItemProps = [
  {
    type: "new_opportunity",
    isNew: true,
    vendorName: "Eduardo F.",
    created: "1"
  },
  {
    type: "new message",
    isNew: true,
    vendorName: "Eduardo M.",
    created: "1"
  },
  {
    type: "call",
    isNew: false,
    vendorName: "Eduardo C.",
    created: "1"
  }
];

export default class NotificationPanel extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  typeToFont(type) {
    switch (type) {
      case NEW_OPPORTUNITY:
        return 'ic-new-folder';
      case NEW_MESSAGE:
        return 'ic-email';
      case "call":
        return 'ic-phone';
      case "new_rating":
        return 'ic-filled-star';
      default:
        return type;
    }
  }

  typeToLabel(type) {
    switch (type) {
      case NEW_OPPORTUNITY:
        return 'Nueva oportunidad';
      case NEW_MESSAGE:
        return 'Nuevo mensaje';
      case "call":
        return 'Solicitud de llamada';
      case "new_rationg":
        return 'Nueva valoración'
    }
  }

  typeToText(type) {
    let text = '';
    textForTypes.map((each)=> {
      each.type == type && (text = each.label);
    });
    return text;
  }

  toActions(action) {

  }

  render() {

    return(
      <div className="notification-panel shadow">
        <i className="toggle-notify ic-close" onClick={(e) => this.props.toggleNotify()}/>
        <div className="notification-wrapper col-md-4 col-sm-6">
          <ul className="title">
            <li className="header">Notificaciones</li>
            <li className="circle">5</li>
          </ul>
          <div className="row">
            <ul className="actions">
              <li className="action-box"><div onClick={::this.toActions('a')}><i className="ic-new-folder"/></div></li>
              <li className="action-box"><div onClick={::this.toActions('b')}><i className="ic-email"/></div></li>
              <li className="action-box"><div onClick={::this.toActions('c')}><i className="ic-phone"/></div></li>
              <li className="action-box"><div onClick={::this.toActions('d')}><i className="ic-filled-star"/></div></li>
            </ul>
          </div>
          <div className="row">
            <div className="live-box">
              {defaultItemProps
                .sort((each)=>{return each.isNew ? 0 : 1})
                .map((item, i)=>
                  <div key={i} className={`item ${item.isNew ? 'active' : ''}`}>
                    <div className="each">
                      <div className="image"><i className={this.typeToFont(item.type)}/></div>
                      <div className="content-wrapper">
                        <div className="status"> {this.typeToLabel(item.type)} </div>
                        <div className="description"> {this.typeToText(item.type)} <span>{item.vendorName}</span> </div>
                        <div className="dash"> - </div>
                        <div className="time">{`Hace ${item.created} hora`}</div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
