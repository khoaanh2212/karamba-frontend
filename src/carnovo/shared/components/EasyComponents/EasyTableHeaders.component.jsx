import React, {Component} from 'react';

let Th = ({stateOrder, label, field, identity, toggleSort}) => {
  let icon = stateOrder.field === field && stateOrder.order ? 'expand_less' : 'expand_more';

  return (
    <th className={stateOrder.field === field ? "th-order active" : "th-order"}
        onClick={() => toggleSort(field, identity)}>
      {label}
      <span>
        <i className="material-icons">{icon}</i>
      </span>
    </th>
  );
};

export default class EasyTableHeaders extends Component {

  render() {
    let headers = this.props.headers;
    return (

      <thead>
      <tr>
        {headers.map((header, i) =><Th key={i}
              stateOrder={this.props.sort} label={header.label} field={header.label} toggleSort={this.props.toggleSort} identity={header.identity}
        />)}
        {this.props.emptyColumn ? <th>&nbsp;</th> : null}
      </tr>
      </thead>

    );
  }
}



