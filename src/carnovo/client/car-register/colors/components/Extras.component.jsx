import React, {Component} from 'react';
import _ from 'lodash';
import FormatCurrency from '../../../../shared/utils/FormatCurrency';

export default class Extras extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.firstLoadExtras && nextProps.extras.length > 0) {
      let extras = nextProps.extras;
      _.map(extras, extra => {
        extra.expand = false;
        _.map(extra.options, option => {
          if(option.includedBy != null || option.requiredBy != null) {
            option.selected = true;
            if(option.includedBy != null) {
              option.includedText="Incluido en el pack seleccionado";
            } else {
              option.includedText="Requerido por el pack seleccionado";
            }
            this.props.changeSelectedExtras(option);
          } else {
            option.selected = false;
          }
        });
      });
      this.setState({
        extras: extras
      });
      nextProps.clearFirstLoad();
    }
  }

  onChangePackage(extraIndex, optionIndex, extra) {
    let extras = this.state.extras;
    extras[extraIndex].options[optionIndex].selected = !extra.selected;
    this.setState({
      extras: extras
    });
    this.props.changeSelectedExtras(extra);
  }

  toggleList(index) {
    let extras = this.state.extras;
    extras[index].expand = !extras[index].expand;
    this.setState({extras});
  }

  render() {
    let mainClass = this.props.showExtras ? "extras-area container" : "extras-area container hidden";
    return (
      <div className={mainClass}>
        <h1 className="text-center">Selecciona los extras para tu <strong>{this.props.model}</strong></h1>
        <div className="list-group">
          {
            _.map(this.state.extras, (extras, index) => {
              let open = extras.expand ? 'open' : '';
              let className = `list-group-item ${open}`;
              return <div className={className} key={index}>
                <div className="heading-item" onClick={this.toggleList.bind(this, index)}>
                  <b>{extras.name}</b>
                  <i className="pull-right ic-caret-up"></i>
                  <i className="pull-right ic-caret-down"></i>
                </div>
                {extras.expand ?
                  <div className="body-list">
                    {
                      _.map(extras.options, (optionsExtras, optionIndex)=> {
                        return <div className="body-list-item" key={optionIndex}>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" checked={optionsExtras.selected}
                                     className="checkbox"
                                     disabled={optionsExtras.disabled}
                                     onChange={this.onChangePackage.bind(this,index,optionIndex,optionsExtras)}/>
                              <span></span>
                            </label>
                          </div>
                          <div className="info">
                            <p>{optionsExtras.optionName}</p>
                            {optionsExtras.includedText}

                          </div>
                          <div className="price">{FormatCurrency(optionsExtras.price)}</div>
                        </div>
                      })
                    }

                  </div> : ""}
              </div>
            })
          }
        </div>
      </div>
    );
  }
}
