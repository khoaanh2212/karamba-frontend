import React, {Component} from 'react';
import { EasyDateRange } from '../../../../shared/components/EasyComponents/EasyDatePicker.component';
import OpportunityStatusMap from '../../../../shared/utils/OpportunityStatusMap';

let toStringDate = (data) => {
  let picker = data.datePicker;
  let start = picker.rangePicker['startDate'] && picker.rangePicker['startDate'].format(picker.format).toString();
  let end = picker.rangePicker['endDate'] && picker.rangePicker['endDate'].format(picker.format).toString();
  return [start || 'Desde',' - ',end || 'Hasta'].join('');
};

let SelectStatus = (data) => {
  var unique = {};
  var distinct = [];
  for( var i in data.offers ){
    if( typeof(unique[data.offers[i].state]) == "undefined"){
      distinct.push(data.offers[i]);
    }
    unique[data.offers[i].state] = 0;
  }

  let styles = data.value !== '' ? '' : 'default';

  return (
    <select value={data.value} className={styles + ' carnovo-select'} default="default" onChange={data.onChange} onClick={data.onClick}>
      <option className="default-option" value="">Activas</option>
      {
        distinct.map((offer, i) => <option key={i} value={offer.state}> {OpportunityStatusMap(offer.state).label} </option>)
      }
    </select>
  )
};

export default class OpportunitiesFilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: ''
    };
  }

  handleOnChangeSelectStatus(field, event) {
    this.props.onChange(field, event.target.value);
    this.setState({selectValue: event.target.value});
  }

  render() {
    let data = this.props;
    return (
      <div className="input-group">
        {data.headers.map((header, i) => {
          if (header.field == 'state') {
            return <SelectStatus key={i}
                                 value={this.state.selectValue}
                                 offers={data.offers}
                                 onChange={this.handleOnChangeSelectStatus.bind(this, "state")}
                                 onClick={() => {data.datePicker.onClose();}}/>
          }

          if (header.field == 'created') {
            return (
              <div key={i} style={{float: "left", marginRight: "10px", position: "relative"}} tabIndex="0" onBlur={data.datePicker.onClose}>
                <input type="text" className="input-filter" style={{width: "220px", color: "#00a4ff"}} placeholder={header.label} onClick={()=> {
                  data.datePicker.onInit();
                }} value={toStringDate(data)} readOnly/>
                <EasyDateRange
                  style={{display: data.datePicker.display ? "block" : "none"}}
                  theme={{
                    Day: {fontSize: "15px", fontWeight: "300"},
                    DaySelected: {background: "#00a4ff",color: "#fff"},
                    DayInRange: {background: "#f6f6f6", color: "#000"},
                    DateRange: {width: "570px", position: "absolute", top: "55px", right: "0", zIndex: "9999", border: "1px solid #ccc"},
                    DayHover: {background: "#ffffff", color: "#7f8c8d", transform: "scale(1.1) translateY(-10%)", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"},
                    MonthAndYear: {color: "#535353", fontSize: "18px", fontWeight: "700", lineHeight: "18px"},
                    MonthButton: {background: "#fff"}
                  }}
                  startDate={data.datePicker.startDate}
                  endDate={data.datePicker.endDate}
                  onChange={data.datePicker.onChange}
                />
              </div>
            )
          }

          return (
            <input type="text" className="input-filter" key={i} placeholder={header.label} onChange={(e) => {data.onChange(header.field, e.target.value)}}/>
          )
        })}
      </div>
    )
  }
}
