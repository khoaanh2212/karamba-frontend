import React, {Component} from 'react';
import Condition from './Condition.component';
import {GeneralConditionMap} from '../../../../shared/utils/GeneralConditionMap';

let intersect_safe = (a, b) =>
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
    if      (a[ai].id < b[bi].id ){ ai++; }
    else if (a[ai].id > b[bi].id ){ bi++; }
    else /* they're equal */
    {
      result.push(a[ai]);
      ai++;
      bi++;
    }
  }

  return result;
};

let diff = (a, b) =>
{
  let test;
  return a.filter(eacha =>
  {
    test = b.filter((eachb) =>
        eacha.id == eachb.id
    );

    return test.length == 0
  })
};

let decorateListed = (list) => {
  return list.sort((a, b) =>
    a.id > b.id ? -1 : (a.id > b.id ? 1 : 0)
  )
};

export default class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      listed: []
    }
  }

  componentWillMount() {
    this.updateListedAndSelected();
  }

  // componentWillReceiveProps() {
  //   this.updateListedAndSelected();
  // }

  updateListedAndSelected() {
    let conditions = this.props.conditions;
    let generals = this.props.generalConditions.value;
    let intersected = intersect_safe(conditions, generals);
    let lefts = diff(conditions, intersected);

    if (lefts.length > 0) {
      this.setState({listed: decorateListed(lefts)});
    }

    if (generals.length > 0) {
      this.setState({selected: decorateListed(generals)});
    }
  }

  toggleCondition(condition, bool = true) {
    let list1 = bool ? "listed" : "selected";
    let list2 = bool ? "selected" : "listed";
    let cid = condition.id;
    let addTemp;
    let removeTemp;
    let objTemp = {};

    this.state[list1].map((each, i) => {
      if (each.id == cid) {
        addTemp = this.state[list2];
        addTemp.push(condition);

        removeTemp = this.state[list1];
        removeTemp.splice(i, 1);

        objTemp[list1] = removeTemp;
        addTemp = decorateListed(addTemp);
        objTemp[list2] = addTemp;

        this.setState(objTemp);
        this.props.onConditionChange.onChange(this.state.selected);
      }
    });
  }

  render() {

    return (
      <div className="form-input">
        <label htmlFor={this.props.labelId}>
          {this.props.label}
        </label>
        <div className="select-conditions">
          <h4>Selecciona aquí condiciones que aplican tus ofertas</h4>
          <hr className="open"/>
          {this.state.selected.map((generalCondition, i) =>
            <Condition removeCondition={() => this.toggleCondition(generalCondition, false)}
                       key={i}
                       text={GeneralConditionMap(generalCondition.text)}/>
          )}

          <select onChange={event => {
            try {
              this.toggleCondition(JSON.parse(event.target.value));
            } catch (e) {}
            event.target.selectedIndex = 0;
          }}>
            <option value="">Añade otra condición</option>
            {this.state.listed.map((option, i) =>
              <option key={i} value={JSON.stringify(option)}>{GeneralConditionMap(option.text)}</option>)}
          </select>
          <hr className="close"/>
        </div>
      </div>
    );
  }
}
