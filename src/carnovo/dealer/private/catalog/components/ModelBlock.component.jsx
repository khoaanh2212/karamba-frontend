import React, {Component} from 'react';

export default class ModelBlock extends Component {

  showName = (model)=>{
    var name = model.duplicated ? model.name + " " + model.year : model.name;
    var nameToDisplay = name.length > 13 ? name.substring(0, 10) + "..." : name;

    if(name.length > 13) {
      return <div className="catalog-tooltip">
              {nameToDisplay}
              <span className="catalog-tooltiptext" style={{top:'40px'}}>
                <div>{name}</div>
              </span>
      </div>
    }else{
      return nameToDisplay;
    }

  };

  render() {

    return (
      <div id="catalog">
        <div className="manufacturer-model-row">
          <div className="manufacturer-model-block m-all" onClick={event => {this.props.toggleAllModels()}}>Todos</div>
          {this.props.models.map((model, i) =>
            <div key={i} className={model.available ? 'manufacturer-model-block active' : 'manufacturer-model-block'} onClick={event => {this.props.toggleModel(model)}}>

              {this.showName(model)}

            </div>
          )}
        </div>
      </div>
    );
  }
}
