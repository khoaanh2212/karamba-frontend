import React, {Component} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';
import FormatCurrency from '../../utils/FormatCurrency';

export default class EasySelect extends Component {
    onChangeItem(option, event) {
        if (this.props.formItem && typeof this.props.formItem.onChange === 'function') {
            this.props.formItem.onChange(option);
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(option, event);
        }
    }

    render() {
        let toShow = option => this.props.fieldToShow ? option[this.props.fieldToShow] : option;
        let itemId = option => this.props.fieldId ? option[this.props.fieldId] : option;
        let labelClass = this.props.labelClass ? 'easy-select ' + this.props.labelClass : 'easy-select';

        return (
            <div className={labelClass}>
                {this.props.options.map((option, i) => {
                    var price = null;
                    if(option.price) {
                        price = option.price;
                    }
                    if(option.prices) {
                        price = option.price;
                    }
                        return (
                            <label key={i}>
                                {this.props.preview ? <div className="preview"></div> : null}
                                <div>
                                    <input type="radio" checked={this.props.isChecked(option)}
                                           className="radio"
                                           value={itemId(option)}
                                           onChange={event => this.onChangeItem(option, event)}/>
                                    <span>{toShow(option)}</span>
                                </div>
                                {price!=null ?
                                    <div id="price" className="col-1-8">{FormatCurrency(price)}€</div>
                                    :null}
                            </label>
                        )
                    }
                )}
            </div>
        )
    }
}
