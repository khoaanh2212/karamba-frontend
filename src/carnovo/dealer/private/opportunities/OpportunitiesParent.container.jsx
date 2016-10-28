import React, {Component} from 'react';
import EasyTitle from 'shared/components/EasyComponents/EasyTitle.component'

export default class OpportunitiesParent extends Component {

  render() {
    return (
      <div>
        <EasyTitle title="Oportunidades"/>
        {React.cloneElement(this.props.children,
          {
            opportunities: this.props.opportunities
          })}
      </div>
    )
  }
}
