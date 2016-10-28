import React, {Component} from 'react';
import ModelBlock from './ModelBlock.component'

export default class ManufacturerBlock extends Component {

  render() {
    let selected = this.props.selected.name;
    let selectAll = this.props.selected.all;
    let models = this.props.models;
    let deleteButton;
    let modelBlock;
    if (selected !== 'default') {
      deleteButton = <div onClick={event => this.props.data.removeManufacturer(selected)} className="manufacturer-action-delete">Eliminar</div>;
      let toggleModel = (model) => {
        return this.props.data.toggleModel(selected, model)};
      let toggleAllModels = () => {
        return this.props.data.toggleAllModels(selected)};
      modelBlock = <ModelBlock all={selectAll} models={models ? models : []} toggleModel={toggleModel} toggleAllModels={toggleAllModels}/>;
    }
    return (
      <div>
        <div className="manufacturer-row">
          <div className="small-m-block manufacturer-left">
            <div className="manufacturer-title">
              Marca
            </div>
          </div>
          <div className="big-m-block manufacturer-right manufacturer-title">
            <div className="manufacturer-select">
              <select disabled={this.props.disabled} value={selected}
                      onChange={event => this.props.data.addManufacturer(event.target.value)}>
                <option disabled hidden className="default-option" value="default">Añadir nueva marca</option>
                {this.props.data.manufacturers.map((option, i) =>
                  <option key={i} value={option.name}>{option.name}</option>)}
              </select>
            </div>
            {deleteButton}
            {modelBlock}
          </div>
        </div>
      </div>
    );
  }
}

