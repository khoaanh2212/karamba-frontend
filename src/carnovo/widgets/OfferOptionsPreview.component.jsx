import React, {Component} from 'react';
import {map} from 'lodash';
import {GeneralConditionMap} from '../shared/utils/GeneralConditionMap';

let RowCondition = ({conditions}) => {
  return (
    <div className="row">
      {
        map(conditions, (condition, index) => {
          return (
            <div key={index} className="col-xs-4 star">
              <span className="icon_star"></span>
              <span className="text">{GeneralConditionMap(condition.text)}</span>
            </div>
          )
        })
      }
    </div>
  );
};

export default class OfferOptionsPreview extends React.Component {
  manipulateConditionsByRow(conditions) {
    let result = [];
    let index = -1;
    for (let i = 0; i < conditions.length; i++) {
      if (i%3 === 0) {
        index++;
        result[index] = [];
      }
      result[index].push(conditions[i]);
    }
    return result;
  }

  render() {
    let rows = this.manipulateConditionsByRow(this.props.conditions);
    return (
      <div className="grid footer conditions">
        <div className="row">
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">Coche nuevo sin matricular</span>
          </div>
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">Impuesto de circulación incluido</span>
          </div>
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">Incluye matriculación</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">IVA Incluido</span>
          </div>
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">Servicio en concesionarios oficiales</span>
          </div>
          <div className="col-xs-4 checked">
            <span className="icon"></span>
            <span className="text">Garantía incluida a nivel nacional</span>
          </div>
        </div>
        {
          map(rows, (conditions, index) => {
            return <RowCondition key={index} conditions={conditions}/>;
          })
        }
      </div>
    );
  }
}
