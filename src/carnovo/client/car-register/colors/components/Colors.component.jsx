import React, {Component} from 'react';
import ColorMap from '../../../../shared/utils/ColorMap';
import {map} from 'lodash';
import FormatCurrency from '../../../../shared/utils/FormatCurrency';

export default class Colors extends Component {

  constructor() {
    super();
    this.defaultName = 'Ninguna preferencia';
    this.state = {
      colors: [],
      limitColor: true,
      isNotInterested: true,
      selectedColorName: this.defaultName
    };
    this.limit = 7;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colors.length > 0 && nextProps.firstLoadColors) {
      let colors = nextProps.colors;
      map(colors, color => {
        color.selected = false;
      });
      this.setState({
        colors: colors
      });
      nextProps.clearFirstLoad();
    }
  }

  onChangeColorSelected(index, color) {
    let colors = this.clearSelectedColor(this.state.colors);
    colors[index].selected = true;
    this.setState({
      colors: colors,
      isNotInterested: false,
      selectedColorName: color.optionName
    });
    this.props.changeSelectedColor(color);
  }

  onInterestedSelected() {
    let isNotInterested = this.state.isNotInterested;
    let colors = this.state.colors;
    let selectedColorName = this.state.selectedColorName;

    if (!isNotInterested) {
      colors = this.clearSelectedColor(this.state.colors);
      selectedColorName = this.defaultName,
        this.props.changeSelectedColor(0, "");
    }

    this.setState({
      colors: colors,
      selectedColorName: selectedColorName,
      isNotInterested: !isNotInterested
    });
  }

  clearSelectedColor(colors) {
    map(colors, color => {
      if (color.selected == true)
        color.selected = false;
    });
    return colors;
  }

  unLimitColor() {
    this.setState({
      limitColor: false
    });
  }

  render() {
    return (<div className="color-picker">
      <div className={"title text-center text-blue " + (this.state.colors.length === 0 ? "hidden" : "")}>{this.state.selectedColorName}</div>

      <div className="color-list">
        {
          map(this.state.colors, (color, index) => {
            let colorName = 'oval-color ' + ColorMap(color.optionName);
            let activeClassName = "";
            if (this.state.limitColor) {
              if (index < this.limit)
                activeClassName = color.selected ? "color-item active" : "color-item";
              else
                activeClassName = color.selected ? "color-item active hidden" : "color-item hidden";
            } else if (!this.state.limitColor) {
              activeClassName = color.selected ? "color-item active" : "color-item";
            }
            return <div className={activeClassName} key={index}
                        onClick={this.onChangeColorSelected.bind(this,index,color)}>
              <div className={colorName}></div>
              <div className="text-center text-small">{color.optionName}</div>
              <span className="price">PVP {FormatCurrency(color.price)}</span>
            </div>
          })
        }
        {this.state.limitColor && this.state.colors && this.state.colors.length > this.limit ?
          <div className="color-item add-more" onClick={this.unLimitColor.bind(this)}>
            <p>Cargar más</p>
          </div> : ""}

      </div>

      <div className="title text-center text-blue">
        <div className="radio">
          <label>
            <input type="radio" className="radio" checked={this.state.isNotInterested}
                   onChange={::this.onInterestedSelected}/>
            <span>Ninguna preferencia</span>
          </label>
        </div>
      </div>
    </div>);
  }
}
