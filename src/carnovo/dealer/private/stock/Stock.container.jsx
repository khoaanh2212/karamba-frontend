import React, {Component} from 'react';


export default class Stock extends Component {

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children,
          {
            brands: this.props.brands,
            stock: this.props.stock,
            getModelsByBrand: this.props.getModelsByBrand
          })}
      </div>
    )
  }
}
