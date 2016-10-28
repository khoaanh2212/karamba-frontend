import React, {Component} from 'react';

export default class DealerAppHome extends Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children,
          {
            profile: this.props.profile,
            conditions: this.props.conditions
          })}
      </div>
    )
  }
}
