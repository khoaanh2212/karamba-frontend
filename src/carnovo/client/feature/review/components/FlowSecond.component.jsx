import React, {Component} from 'react'
import {map} from 'lodash';

export default class FlowSecond extends Component {
  constructor() {
    super();
    this.state = {
      selected: {}
    }
  }

  onClick(gift) {
    this.setState({selected: gift});
    this.props.updateInfo({giftSelected: gift})
  }

  render() {

    return(
      <div className="second-flow">
        <div className="col-xs-12">
          {map(this.props.gifts, (gift, i)=>
            <div key={i} className={`col-xs-3 box ${gift.gift_name === this.state.selected.gift_name ? 'clicked' : ''}`} onClick={(e)=> this.onClick(gift, e)}>
              <div className="price">{gift.gift_value}</div>
              <div className="name">{gift.gift_name}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
