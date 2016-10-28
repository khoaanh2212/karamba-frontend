import React, {Component} from 'react'
import ConfigurationBlock from './ConfigurationBlock.component';

export default class RowConfiguration extends Component {
  render() {
    let appliances = this.props.appliances;
    return (
      <div className="row configuration-row">
        {
          _.map(appliances, (appliance, index) => {
              return <ConfigurationBlock appliance={appliance} key={index} deleteAppliance={this.props.deleteAppliance}></ConfigurationBlock>
          })
        }
      </div>
    )
  }
}
