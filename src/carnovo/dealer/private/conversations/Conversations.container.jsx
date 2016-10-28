import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import OpportunitiesFilterBox from '../opportunities/component/OpportunitiesFilterBox.component';
import EasyTitle from 'shared/components/EasyComponents/EasyTitle.component'
import EasyTableHeaders from 'shared/components/EasyComponents/EasyTableHeaders.component';
import {ConversationsStateToProps, ConversationsDispatchToPropsBinding} from "./Conversations.bindings";
import OpportunityRow from '../opportunities/component/OpportunityRow.component';

@connect(ConversationsStateToProps, ConversationsDispatchToPropsBinding)
export default class ConversationsContainer extends Component {
  state = {
    showBox: false,
    showDate: false,
    filters: {},
    sort: {field: '', order: ''},
    rangePicker: {}
  };

  handleDateRange(range) {
    this.setState({rangePicker: range})
  }

  handleFilter(field, text) {
    let newState = this.state.filters;
    newState[field] = text;
    this.setState({filters: newState})
  }

  toggleDate() {
    this.setState({showDate: !this.state.showDate});
  }

  closeCalendar() {
    this.setState({showDate: false});
  }

  toggleSearch() {
    this.setState({showBox: !this.state.showBox});
    this.setState({filters: {}}); // reset filter each time open/close filter box
    this.setState({rangePicker: {}}); // reset calendar each time open/close filter box
  }

  toggleConversationsSort(field, identity) {
    this.setState({sort: {field: field, order: !this.state.sort.order, identity: identity}});
  }

  toDetails(id) {
    browserHistory.push(process.env.PUBLIC_PATH + 'dealer/message/' + id);
  }

  render() {
    let format = 'DD/MM/YYYY';
    let conversations = this.props.orderedConversations(this.state.sort, this.state.filters, this.state.rangePicker);

    let formattedToday = ()=> {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1; // January is 0
      let year = today.getFullYear();

      if (day < 10) { day = '0' + day}
      if (month < 10) { month = '0' + month}
      return day + '/' + month + '/' + year;
    };

    return (
      <div className="conversations">
        <EasyTitle title="Conversaciones"/>
        {this.state.showBox ?
          <div className="carnovo-row filter-wrapper">
            <div className="filter-box">
              {<OpportunitiesFilterBox
                headers={[
                  {label: "Núm. ID", field: "id"},
                  {label: "Marca", field: "brand"},
                  {label: "Modelo", field: "model"},
                  {label: "Cliente", field: "clientName"},
                  {label: "Desde  -  Hasta", field: "created"},
                  {label: "Estado", field: "state"}
                ]}
                onChange={::this.handleFilter}
                offers={this.props.conversations.conversations}
                datePicker={{
                  display: this.state.showDate,
                  startDate: formattedToday(),
                  endDate: formattedToday(),
                  onInit: ::this.toggleDate,
                  onChange: ::this.handleDateRange,
                  onClose: ::this.closeCalendar,
                  rangePicker: this.state.rangePicker,
                  format: format
                }}
              />}
              <a className="filter-search filter-close" href="#" onClick={::this.toggleSearch}><i className="ic-close"/></a>
            </div>
          </div> :
          <div className="carnovo-row filter-wrapper">
            <a className="filter-search" href="#" onClick={::this.toggleSearch}><i className="ic-search"/>
              <div className="text-search">
                Buscar / Filtrar
              </div>
            </a>
          </div>
        }

        {conversations.length > 0 ?
          <div className="carnovo-row">
            <div className="easy-table">
              <table>
                <EasyTableHeaders
                  toggleSort={::this.toggleConversationsSort}
                  sort={this.state.sort}
                  headers={[
                    {label:'ID Oferta', identity: (el) => el.id},
                    {label:'Marca', identity: (el) => el.brand},
                    {label:'Modelo', identity: (el) => el.model},
                    {label: 'PVP', identity: (el) => {
                      return parseFloat(el.pvp) + el.summaryExtraPrice;
                    }},
                    {label:'Cliente', identity: (el) => el.clientName},
                    {label:'Fecha / Hora', identity: (el) => el.created},
                    {label:'Estado', identity: (el) => el.state}
                  ]}/>
                <tbody>
                {conversations.map((conversation, j) => <OpportunityRow key={j} onClick={this.toDetails} content={conversation}/>)}
                </tbody>
              </table>
            </div>
          </div>
          :
          <div className="carnovo-row background-grey" style={{padding: "50px"}}>No hay resultados</div>
        }
      </div>)
  }
}
