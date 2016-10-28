import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {StatisticStateToProps, StatisticDispatchToPropsBinding} from "./Statistic.bindings";
import { EasyDateRange } from 'shared/components/EasyComponents/EasyDatePicker.component';
import EasySelectBox from 'shared/components/EasyComponents/EasySelectBox.component';

let StatisticRow = (data) => {
  let mapped = mapStatus(data.status);
  return (
    <div className="col-xs-6 col-sm-4 statistic-box">
      <div className={"items" + (mapped.color ? " " + mapped.color : "")}>
        <div className="image"><i className={mapped.icon}/></div>
        <div className="content">
          <div className="stat"> {data.quantity ? data.quantity : ""} </div>
          <div className="title"> {mapped.title} </div>
        </div>
      </div>
    </div>
  )
};

let mapStatus = (status) => {
  let result = {
    icon: status,
    color: "",
    title: ""
  };
  switch (status) {
    case "received":
      result.icon = "ic-new-folder";
      result.title = "Oportunidades recibidas";
      break;
    case "expired":
      result.icon = "ic-clock-expire";
      result.title = "Oportunidades expiradas";
      break;
    case "requested":
      result.icon = "ic-phone";
      result.title = "Llamadas de clientes";
      break;
    case "performed":
      result.icon = "ic-paper-plane";
      result.title = "Ofertas realizadas";
      result.color = "made";
      break;
    case "won":
      result.icon = "ic-check-success";
      result.title = "Ofertas ganadas";
      result.color = "success";
      break;
    case "lost":
      result.icon = "ic-close";
      result.title = "Ofertas perdidas";
      result.color = "lost";
      break;
    default:
      return result
  }
  return result
};

@connect(StatisticStateToProps, StatisticDispatchToPropsBinding)
export default class StatisticContainer extends Component {
  state = {
    showFilterByRange: false,
    showDatePicker: false,
    continueFilter: false,
    rangePicker: {}
  };

  handleSelectChange(e, flag = false) {
    if (e.value && e.value == "rango") {
      this.setState({showFilterByRange: true, showDatePicker: true})
    } else if (flag || this.state.showFilterByRange) {
      this.setState({showFilterByRange: false, showDatePicker: false})
    }
    if (flag) {
      this.setState({continueFilter: true})
    }
  }

  handleDateRange(range) {
    this.setState({rangePicker: range});
  }

  toggleDateRange() {
    this.setState({showDatePicker: !this.state.showDatePicker})
  }

  render() {
    let statistics = this.props.statistic.statistic;
    let format = 'DD/MM/YYYY';
    let formattedToday = ()=> {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1; // January is 0
      let year = today.getFullYear();

      if (day < 10) { day = '0' + day}
      if (month < 10) { month = '0' + month}
      return day + '/' + month + '/' + year;
    };
    let dateRangeProps = {
      style: {display: this.state.showDatePicker ? "block" : "none"},
      startDate: formattedToday(),
      endDate: formattedToday(),
      onChange: ::this.handleDateRange,
      rangePicker: this.state.rangePicker,
      format: format,
      theme: {
        DateRange: {
          width: "570px",
          position: "absolute",
          top: "55px",
          left: "0",
          zIndex: "9999",
          border: "1px solid #ccc"
        },
        Day: {fontSize: "15px", fontWeight: "300"},
        DaySelected: {background: "#00a4ff", color: "#fff"},
        DayInRange: {background: "#f6f6f6", color: "#000"},
        DayHover: {
          background: "#ffffff",
          color: "#7f8c8d",
          transform: "scale(1.1) translateY(-10%)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"
        },
        MonthAndYear: {color: "#535353", fontSize: "18px", fontWeight: "700", lineHeight: "18px"},
        MonthButton: {background: "#fff"}
      }
    };
    let toStringDate = () => {
      let start = this.state.rangePicker['startDate'] && this.state.rangePicker['startDate'].format(format).toString();
      let end = this.state.rangePicker['endDate'] && this.state.rangePicker['endDate'].format(format).toString();
      return [start || 'Desde',' y ',end || 'Hoy'].join('');
    };
    let selectBoxProps = {
      items: [
        {value:"", label:"Todas"},
        {value:"semana", label:"Esta semana"},
        {value:"mes", label:"Este mes"},
        {value:"ano", label:"Este ano"},
        {value:"rango", label:"Rango de fechas"}
      ],
      selected: {value:"", label:"Todas"},
      onChange: ::this.handleSelectChange,
      visible: this.state.continueFilter
    };

    return (
      <div id="statistic">
        <div className="carnovo-row">
          <div className="carnovo-block" style={{height: "90px", lineHeight: "90px", verticalAlign: "middle"}}>
            Mostrar:
          </div>
          <div className="carnovo-block" style={{verticalAlign: "middle", marginLeft: "10px"}}>
            {!!this.state.showFilterByRange ?
              <div style={{position: "relative"}}>
                <input className="filter-daterange" type="text" onClick={::this.toggleDateRange} value={toStringDate()} readOnly /><i className="ic-caret-down" onClick={(e)=>{
                e.stopPropagation();
                ::this.handleSelectChange({}, true);}}/>
                <div className="caret-down" onClick={(e)=>{
                  e.stopPropagation();
                  ::this.handleSelectChange({}, true);
                }}></div>
                <EasyDateRange {...dateRangeProps}/>
              </div>
            : <EasySelectBox {...selectBoxProps}/>
            }
          </div>
        </div>
        <div className="carnovo-row" style={{marginTop: "30px"}}>
          {statistics.map((statistic, i) => <StatisticRow key={i} {...statistic}/>)}
          <div className="clear">&nbsp;</div>
        </div>
      </div>
    )
  }
}
