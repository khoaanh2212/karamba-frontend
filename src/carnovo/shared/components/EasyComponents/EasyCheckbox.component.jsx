import React, {Component} from 'react';

export default class  EasyCheckbox extends Component {
  handleSelect(option, event) {
    let formItem = this.props.formItem;
    if (formItem.value !== undefined) {
      if (event.target.checked) {
        let newItems = typeof formItem.value === 'string' ? [] : formItem.value;
        formItem.onChange(newItems.concat(option));
      } else {
        let valuesCopy = [...formItem.value];
        let valueIndex = formItem.value.indexOf(option);

        valuesCopy.splice(valueIndex, 1);
        formItem.onChange(valuesCopy);
      }
    } else {
      if (event.target.checked) {
        formItem.onChange([option]);
      }
    }

    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.props.onChange(option, event);
    }
  }


  render() {
    let toShow = option => this.props.fieldToShow ? option[this.props.fieldToShow] : option;
    if (typeof this.props.formItem.value === 'string') this.props.formItem.value = [];

    return (
      <div className="easy-checkbox">
        {this.props.options.map((option, i) => {
            var disabled = option.disabled?"disabled":"";
            return (
              <label className="underscored grid" style={{padding: "5px"}} key={i}>
                <div className="col-7-8">
                  <input type="checkbox" className="checkbox"
                         checked={option.checked || this.props.formItem.value.filter(opt => opt.optionId === option.optionId).length === 1}
                         onChange={e => this.handleSelect(option, e)}
                         disabled = {disabled}
                  />
                  <span>{toShow(option)}</span>
                </div>
                <div id="price" className="col-1-8">{option.price.toLocaleString('es-ES')} €</div>
              </label>
            )
          }
        )}
      </div>
    )
  }
}
