import React, {Component} from 'react';
import EasyTitle from 'shared/components/EasyComponents/EasyTitle.component'

export default class StatisticParent extends Component {

  render() {
    return (
      <div>
        <EasyTitle title="Análisis de oportunidades"/>
        {React.cloneElement(this.props.children,
          {
            statistic: this.props.statistic
          })}
      </div>
    )
  }
}
