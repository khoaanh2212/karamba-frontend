import React, {Component} from 'react';

export default class CarInStock extends Component {
  render() {
    return (
      this.props.opportunity.isStock ?
        <div className="grid footer opportunityCarStock">
          <i className="material-icons">done</i> Coches similares en stock
        </div>
      :null
    )
  }
}
