import React, {Component} from 'react';

export default class EasySelectBox extends Component {
  state = {
    visible: this.props.visible || false,
    selected: this.props.selected || {},
    hasSelected: false
  };

  select(item) {
    this.state.selected = item;
    this.hide();
    this.props.onChange ? this.props.onChange(item) : null;
    this.setState({hasSelected: true});
  }

  show() {
    this.setState({visible: !this.state.visible});
  }

  hide() {
    this.setState({visible: false});
  }

  renderItems() {
    return this.props.items.map((item, i) => {
      return (
        <div key={i} onClick={this.select.bind(this, item)}>
          <span>{item.label}</span>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={"dropdown-container" + (this.state.visible ? " show" : "")} tabIndex="0" onBlur={::this.hide}>
        <div className={"dropdown-select" + (this.state.visible ? " clicked" : "") + (this.state.hasSelected ? " selected" : "")} onClick={::this.show}>
          <span> {this.state.selected.label} </span>
          <i className="ic-caret-down"/>
        </div>
        <div className="dropdown-list">
          <div className="wrapper">
            {::this.renderItems()}
          </div>
        </div>
      </div>
    )
  }
}
