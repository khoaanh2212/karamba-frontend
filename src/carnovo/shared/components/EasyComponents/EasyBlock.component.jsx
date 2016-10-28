import React, {Component} from 'react';

export default class EasyBlock extends Component {

  showName = (item)=>{
    var name = item.duplicated ? item.name + " " + item.year : item.name;
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
      <div id="catalog" className="manufacturer-model-row">
        {this.props.showAll ? <div className="manufacturer-model-block m-all">Todos</div> : null}
        {this.props.items.map((item, i) =>
          <div key={i}
               className={this.props.compare(item) ? 'manufacturer-model-block active' : 'manufacturer-model-block'}
               onClick={event => {this.props.onClick(item)}}>
            {this.showName(item)}
          </div>
        )}
      </div>
    );
  }
}
