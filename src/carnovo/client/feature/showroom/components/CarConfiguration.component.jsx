import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import FirstRowConfiguration from './FirstRowConfiguration.component';
import RowConfiguration from './RowConfiguration.component';
import {map} from 'lodash';

export default class CarConfiguration extends Component {
    onCreateNewConfiguration() {
        this.props.clearSession();
        browserHistory.push(process.env.PUBLIC_PATH + '#brands');
    }

    manipulateAppliancesByRow(appliances) {
      let result = [];
      let index = -1;
      for (let i = 0; i < appliances.length; i++) {
        if (i%3 === 0) {
          index++;
          result[index] = [];
        }
        result[index].push(appliances[i]);
      }
      return result;
    }

    render() {
        let firstRowAppliances = this.props.appliances.slice(0, 2);
        let remainRowsAppliances = this.manipulateAppliancesByRow(this.props.appliances.slice(2, this.props.appliances.length));
        return (
          <div className="configurations">
            <FirstRowConfiguration appliances={firstRowAppliances} performCreateNew={this.onCreateNewConfiguration.bind(this)} deleteAppliance={this.props.deleteAppliance}></FirstRowConfiguration>
            {
              map(remainRowsAppliances, (appliances, index) => {
                return <RowConfiguration key={index} appliances={appliances} deleteAppliance={this.props.deleteAppliance}/>;
              })
            }
          </div>
        )
    }
}
