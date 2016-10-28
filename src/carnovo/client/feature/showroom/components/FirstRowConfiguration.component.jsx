import React, {Component} from 'react'
import ConfigurationBlock from './ConfigurationBlock.component';
import NewConfigurationBlock from './NewConfigurationBlock.component';
import {map} from 'lodash';

export default class FirstRowConfiguration extends Component {
  render() {
    return (
      <div className="configurations row configuration-row">
        <NewConfigurationBlock performCreateNew={this.props.performCreateNew}></NewConfigurationBlock>
        {
          map(this.props.appliances, (appliance, index) => {
            return <ConfigurationBlock appliance={appliance} key={index} deleteAppliance={this.props.deleteAppliance}></ConfigurationBlock>
          })
        }
      </div>
    )
  }
}
