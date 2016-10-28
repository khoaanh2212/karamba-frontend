import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Notifications from 'react-notification-system-redux';
import OpportunityStatusMap from 'shared/utils/OpportunityStatusMap';
import EasyTableHeaders from 'shared/components/EasyComponents/EasyTableHeaders.component';
import OpportunityRow from './component/OpportunityRow.component';
import OpportunitiesFilterBox from './component/OpportunitiesFilterBox.component';
import EasySelectBox from 'shared/components/EasyComponents/EasySelectBox.component';
import { NEW_OPPORTUNITY, NEW_MESSAGE, SENT_OFFER, REPLIED, LOST, OTHERS,ARCHIVED } from './Opportunities.reducer';
import {OpportunitiesStateToProps, OpportunitiesDispatchToPropsBinding} from "./Opportunities.bindings";

let testdata = [{"id":"0799722d-ee62-4b22-baf2-6e3c34c21009","clientName":"Rosttok","clientEmail":"rosttoktest@client.com","brand":"BMW","model":"Serie 2 Gran Tourer","extras":[{"id":1422,"name":"[413] Red de separación del maletero","price":224.87}],"numberOffers":1,"vehicleId":748388120161101,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"40550","package":null,"color":{"id":1091,"name":"[475] Black Sapphire (metalizado)","price":null},"state":"new_opportunity","isRead":true,"created":"2016-10-12 08:35:59","summaryExtraPrice":224.87},{"id":"5a37a1c5-1c1d-4960-9055-ba00a403e27d","clientName":"cuong","clientEmail":"cuong@test.com","brand":"BMW","model":"X6","extras":[{"id":1627,"name":"[654] Sintonizador DAB","price":487.21},{"id":1631,"name":"[6CP] Preparación para Apple CarPlay","price":369.17},{"id":1486,"name":"[601] Sintonizador de TV","price":2282.71},{"id":1492,"name":"[688] Sistema de sonido surround Harman Kardon","price":1344.18},{"id":1494,"name":"[6AN] Concierge Services","price":308.2}],"numberOffers":0,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1611,"name":"[ZBS] Paquete Business (no para clientes particulares)","price":6668.25},"color":null,"state":"new_opportunity","isRead":true,"created":"2016-10-10 07:06:26","summaryExtraPrice":11459.720000000001},{"id":"1658f436-d911-42ab-8850-6b9140b11a83","clientName":"Martin","clientEmail":"patient0001@mailinator.com","brand":"BMW","model":"X6","extras":[],"numberOffers":1,"vehicleId":761162420160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"100200","package":{"id":2055,"name":"[337] Paquete deportivo M","price":7541.47},"color":{"id":1077,"name":"[668] Schwarz (sólido)","price":null},"state":"new_opportunity","isRead":true,"created":"2016-10-10 08:13:26","summaryExtraPrice":7541.47},{"id":"1ba4b8e7-d887-4f39-854d-8b5ad9031880","clientName":"Martin","clientEmail":"patient9999@mailinator.com","brand":"BMW","model":"X6","extras":[],"numberOffers":0,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1611,"name":"[ZBS] Paquete Business (no para clientes particulares)","price":6668.25},"color":null,"state":"new_opportunity","isRead":true,"created":"2016-10-07 09:42:34","summaryExtraPrice":6668.25},{"id":"265c66a4-9c48-482b-ae3a-b466886e9d0f","clientName":"Rosttok","clientEmail":"rosttoktest@client.com","brand":"BMW","model":"X5","extras":[],"numberOffers":2,"vehicleId":723970420160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"59250","package":{"id":2148,"name":"[7S5] Diseño interior Pure Excellence","price":5809.81},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-11 10:03:12","summaryExtraPrice":5809.81},{"id":"352f8028-6c3b-44d3-a1be-8fad20750341","clientName":"el_angelito","clientEmail":"231ad@asd.com","brand":"BMW","model":"i8","extras":[],"numberOffers":1,"vehicleId":732309120160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"139200","package":{"id":1020,"name":"[7Y9] Diseño interior BMW i Halo","price":3000},"color":null,"state":"sent_offer","isRead":true,"created":"2016-10-03 04:18:23","summaryExtraPrice":3000},{"id":"38af2017-9be3-4594-b7b7-e378ba0a4057","clientName":"jordi","clientEmail":"jordi.gil+user@carnovo.com","brand":"Audi","model":"A5","extras":[],"numberOffers":0,"vehicleId":722541320160501,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"44207.27","package":{"id":2008,"name":"[PCF] Paquete de Asistencia plus","price":1551.68},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-11 11:28:06","summaryExtraPrice":1551.68},{"id":"400cd966-3526-449e-a1a9-0b2352afecd8","clientName":"cuong","clientEmail":"cuongtest@mailinator.com","brand":"BMW","model":"X3","extras":[{"id":1081,"name":"[302] Dispositivo de alarma","price":590.68},{"id":1748,"name":"[5AG] Advertencia de cambio de carril","price":689.13},{"id":2244,"name":"[5A1] Faros antiniebla de LED","price":258.43},{"id":2261,"name":"[508] Control de distancia en aparcamiento (PDC) delante y detrás","price":849.1}],"numberOffers":2,"vehicleId":728701320160801,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"45200","package":{"id":2234,"name":"[337] Paquete deportivo M","price":6276},"color":null,"state":"sent_offer","isRead":true,"created":"2016-10-04 03:06:59","summaryExtraPrice":8663.34},{"id":"561af0f8-1ebc-4a5c-8680-ac40c454efa8","clientName":"cuong","clientEmail":"cuong@test.com","brand":"BMW","model":"X6","extras":[{"id":1627,"name":"[654] Sintonizador DAB","price":487.21}],"numberOffers":0,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1611,"name":"[ZBS] Paquete Business (no para clientes particulares)","price":6668.25},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-14 11:16:52","summaryExtraPrice":7155.46},{"id":"589ecaf0-c7b5-4c98-84a7-e57981596e89","clientName":"Rosttok","clientEmail":"rosttoktest@client.com","brand":"BMW","model":"X6","extras":[],"numberOffers":0,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1511,"name":"[7S9] Paquete de servicios ConnectedDrive","price":862.98},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-12 10:26:14","summaryExtraPrice":862.98},{"id":"58d2fddb-6638-4f7f-b309-580360a3f20a","clientName":"1234","clientEmail":"aie@aie.com","brand":"BMW","model":"i3","extras":[],"numberOffers":0,"vehicleId":725326720161101,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"39990","package":{"id":1029,"name":"[5DU] Paquete de asistente de aparcamiento","price":1000},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-14 08:18:15","summaryExtraPrice":1000},{"id":"005f3e90-62f2-4ca9-b98b-645b44b6132c","clientName":"Alex León","clientEmail":"alexxleonn@gmail.com","brand":"Ford","model":"Focus","extras":[{"id":1002,"name":"[FFP-375] Sistema Auto-Start-Stop","price":250},{"id":1005,"name":"[FEF-578] Alarma perimétrica y volumétrica + Doble Cierre","price":285},{"id":1006,"name":"[FEP-603] Control de crucero + limitador de velocidad","price":200},{"id":1009,"name":"[FES-622] Paquete Active Vision","price":550.01},{"id":1011,"name":"[DFA-68BD] Paquete Invierno","price":450},{"id":1012,"name":"[FF6-712] Luz ambiental","price":200},{"id":1082,"name":"[EFI-45I] Radio CD + SYNC 3 con pantalla táctil de 8\" + 6 altavoces","price":524.99},{"id":1083,"name":"[FP7] Ford Protect Life 7 años/100.000 km","price":350}],"numberOffers":0,"vehicleId":769517320161001,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"25975","package":{"id":1078,"name":"[DF5-68D2] Paquete Travel ST-Line","price":1575},"color":{"id":1022,"name":"[04] Negro Shadow (metalizado)","price":null},"state":"new_opportunity","isRead":true,"created":"2016-10-20 15:38:38","summaryExtraPrice":4385},{"id":"7486c6c8-57e9-4056-9b3d-f9f1eda9cf73","clientName":"Victor Delgado","clientEmail":"victor+client@thenorthstudio.com","brand":"Audi","model":"A3","extras":[{"id":1619,"name":"[PS1] Asientos deportivos","price":287.29},{"id":1630,"name":"[7S1] Deflector cortavientos","price":390.5},{"id":1425,"name":"[EA2] Extensión de garantía Audi 1 año adicional o un máximo de 60.000 km","price":169.76},{"id":1538,"name":"[6SJ] Alfombrilla reversible para el maletero con lados goma/tela","price":73.97}],"numberOffers":1,"vehicleId":727717120160801,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"38550","package":{"id":1625,"name":"[WAV] Paquete Visión","price":1316},"color":{"id":1671,"name":"[T9T9] Blanco Ibis","price":null},"state":"new_opportunity","isRead":false,"created":"2016-10-19 11:19:34","summaryExtraPrice":2237.52},{"id":"8519e096-5391-4cbe-9da1-6f2ba5f51ae1","clientName":"jordi","clientEmail":"jordi.gil+user@carnovo.com","brand":"Audi","model":"A3","extras":[],"numberOffers":0,"vehicleId":738212320160801,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"38700","package":{"id":1533,"name":"[PB4] Paquete Black line","price":708.46},"color":{"id":1117,"name":"[M5M5] Marrón Beluga (metalizado)","price":null},"state":"new_opportunity","isRead":false,"created":"2016-10-11 11:27:28","summaryExtraPrice":708.46},{"id":"8d38c759-72e4-47e2-a794-16d414f061ec","clientName":"Rosttok","clientEmail":"rosttoktest@client.com","brand":"Audi","model":"S3","extras":[{"id":1763,"name":"[TSD] Tarjeta SD (accesorio obligatorio)","price":22.38},{"id":1764,"name":"[35B/35C/35D/35E] Cable USB (accesorio obligatorio)","price":33.95}],"numberOffers":0,"vehicleId":768174020160601,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"48520","package":null,"color":{"id":1511,"name":"[L5L5] Plata Florete (metalizado)","price":null},"state":"new_opportunity","isRead":false,"created":"2016-10-11 09:13:02","summaryExtraPrice":56.33},{"id":"c07b0c5a-f4ae-4794-82d4-4a56965d1481","clientName":"cuong1","clientEmail":"cuong1@test.com","brand":"BMW","model":"X6","extras":[],"numberOffers":2,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1511,"name":"[7S9] Paquete de servicios ConnectedDrive","price":862.98},"color":null,"state":"sent_offer","isRead":true,"created":"2016-10-21 07:50:51","summaryExtraPrice":862.98},{"id":"cbaf66bc-ff56-43d4-9005-7166cb3f3644","clientName":"Rosttok","clientEmail":"rosttoktest@client.com","brand":"BMW","model":"Serie 5","extras":[],"numberOffers":0,"vehicleId":720844120160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"46650","package":null,"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-13 03:31:57","summaryExtraPrice":0},{"id":"cf943db7-7b10-4926-beea-157b3609ae23","clientName":"Martin","clientEmail":"patient9999@mailinator.com","brand":"BMW","model":"X6","extras":[{"id":1868,"name":"[220] Autonivelación con suspensión de aire","price":974.32},{"id":1984,"name":"[2VP] Paquete de chasis adaptivo Dynamic","price":4070.3}],"numberOffers":0,"vehicleId":761162620160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"79600","package":{"id":2105,"name":"[7KV] Diseño interior Pure Extravagance Cognac/Schwarz","price":3330.61},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-07 09:41:01","summaryExtraPrice":8375.23},{"id":"d392dee8-8eb3-45a5-a6b0-f16a531d32c0","clientName":"jordi","clientEmail":"jordi.gil+user@carnovo.com","brand":"BMW","model":"i3","extras":[],"numberOffers":1,"vehicleId":725326720161101,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"39990","package":{"id":1261,"name":"[7S9] Paquete de servicios ConnectedDrive","price":681.26},"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-11 11:30:00","summaryExtraPrice":681.26},{"id":"e5e65965-6832-4070-85a3-4bcc61190aa9","clientName":"cuong","clientEmail":"cuong@test.com","brand":"Ford","model":"Focus","extras":[],"numberOffers":0,"vehicleId":708131620161001,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"19575","package":null,"color":null,"state":"new_opportunity","isRead":false,"created":"2016-10-14 10:47:01","summaryExtraPrice":0},{"id":"e6a037a6-6fdf-4bfc-a930-3f4f5de20012","clientName":"cuong","clientEmail":"cuongtest@mailinator.com","brand":"BMW","model":"X6","extras":[{"id":1627,"name":"[654] Sintonizador DAB","price":487.21}],"numberOffers":1,"vehicleId":708373320160701,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"107200","package":{"id":1611,"name":"[ZBS] Paquete Business (no para clientes particulares)","price":6668.25},"color":{"id":1101,"name":"[300] Alpinweiß (sólido)","price":null},"state":"sent_offer","isRead":true,"created":"2016-10-04 03:02:32","summaryExtraPrice":7155.46},{"id":"fd4bfaae-3c2e-498c-8e7c-00b804b50358","clientName":"cuong","clientEmail":"cuong@test.com","brand":"Audi","model":"A7","extras":[],"numberOffers":1,"vehicleId":749466620160501,"dealerId":"d14de074-82c3-4516-932f-9baa65df5bf9","pvp":"64950.74","package":{"id":1073,"name":"[PGD] Llave de confort con apertura por control gestual (con alarma y safelock)","price":1635.97},"color":{"id":1152,"name":"[W1W1] Azul Lunar (metalizado)","price":null},"state":"new message","isRead":true,"created":"2016-10-04 11:07:22","summaryExtraPrice":1635.97}];

// let asd = testdata
//   .sort()
//   .filter(function(value, index, array) {
//     return (index === 0) || (value.state !== array[index-1].state)
//   });
// var unique = {};
// var distinct = [];
// for( var i in testdata ){
//   if( typeof(unique[testdata[i].state]) == "undefined"){
//     distinct.push(testdata[i]);
//   }
//   unique[testdata[i].state] = 0;
// }
// console.log(unique, distinct);

@connect(OpportunitiesStateToProps, OpportunitiesDispatchToPropsBinding)
export default class OpportunitiesContainer extends Component {

  state = {
    showBox: false,
    showDate: false,
    rangePicker: {},
    filters: {},
    sort: {field: '', order: ''},
    sort_act: {field: '', order: ''}
  };

  componentWillMount() {
    if (this.props.newOffer) {
      this.showInfo(<div style={{fontWeight: 500}}>Felicidades has enviado una nueva oferta.</div>);
    }
  }

  handleDateRange(range) {
    this.setState({rangePicker: range})
  }

  handleFilter(field, text) {
    let newState = this.state.filters;
    newState[field] = text;
    this.setState({filters: newState})
  }

  reloadListByState(state) {
    if (state == ARCHIVED) {
      this.props.fetchOpportunitiesArchived(this.props.token);
    } else {
      if (!state) {
        this.props.fetchOpportunities(this.props.token);
      }
      this.handleFilter("state", state);
    }
  }

  toActions(id, action) {
    browserHistory.push(process.env.PUBLIC_PATH + 'dealer/' + action + '/' + id);
  }

  toDetails(id){
    if (this.content.state === NEW_OPPORTUNITY) {
      this.content.isRead = true;
      browserHistory.push(process.env.PUBLIC_PATH + 'dealer/opportunities/' + id);
    }
  }

  toggleDate() {
    this.setState({showDate: !this.state.showDate});
  }

  closeCalendar() {
    this.setState({showDate: false});
  }

  toggleNotify() {
    this.setState({showNotify: !this.state.showNotify});
  }

  toggleOffersSort(field, identity) {
    this.setState({sort: {field: field, order: !this.state.sort.order, identity: identity}});
  }

  toggleAchievedSort(field, identity) {
    this.setState({sort_act: {field: field, order: !this.state.sort_act.order, identity: identity}});
  }

  toggleSearch() {
    this.setState({showBox: !this.state.showBox});
    this.setState({filters: {}}); // reset filter each time open/close filter box
    this.setState({rangePicker: {}}); // reset calendar each time open/close filter box
  }

  showInfo(message) {
    let notificationOpts = {
      message: message,
      position: 'bc',
      autoDismiss: 2
    };

    this.props.toast(Notifications.info(notificationOpts));
  }

  render() {
    let offers = this.props.orderedOpportunities(this.state.sort, NEW_OPPORTUNITY, this.state.filters,this.state.rangePicker);
    let achieved = this.props.orderedOpportunities(this.state.sort_act, OTHERS, this.state.filters,this.state.rangePicker);
    let offersResult = offers.length > 0;
    let achievedResult = achieved.length > 0;
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

    let selectBoxProps = {
      items: [
        {value:"", label:"Todas"},
        {value: NEW_OPPORTUNITY, label: OpportunityStatusMap(NEW_OPPORTUNITY).label},
        {value: SENT_OFFER, label: OpportunityStatusMap(SENT_OFFER).label},
        {value: NEW_MESSAGE, label: OpportunityStatusMap(NEW_MESSAGE).label},
        {value: REPLIED, label: OpportunityStatusMap(REPLIED).label},
        {value: LOST, label: OpportunityStatusMap(LOST).label},
        {value: ARCHIVED, label: OpportunityStatusMap(ARCHIVED).label}
      ],
      selected: {value:"", label:"Activas"},
      onChange: (event) => this.reloadListByState(event.value)
    };

    return (
      <div id="opportunities">
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
                offers={this.props.opportunities.opportunities}
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
            <div className="filter-title">
              Mostrar:
            </div>
            <div className="filter-state">
              <EasySelectBox {...selectBoxProps}/>
            </div>
          </div>
        }

        {!offersResult && !achievedResult ?
          <div className="carnovo-row background-grey" style={{padding: "50px"}}>No hay resultados</div> : null}

        {offersResult ?
          <div className="carnovo-row background-grey">
            <div className="easy-table">
              <table>
                <EasyTableHeaders
                  toggleSort={::this.toggleOffersSort}
                  sort={this.state.sort}
                  headers={[
                    {label: 'ID Oferta', identity: (el) => el.id},
                    {label: 'Marca', identity: (el) => el.brand},
                    {label: 'Modelo', identity: (el) => el.model},
                    {label: 'PVP', identity: (el) => {
                      return parseFloat(el.pvp) + el.summaryExtraPrice;
                    }},
                    {label: 'Cliente', identity: (el) => el.clientName},
                    {label: 'Ofertas Recibidas', identity: (el) => el.numberOffers},
                    {label: 'Estado', identity: (el) => el.state}
                  ]}
                  emptyColumn={true}/>
                <tbody>
                {offers.map((opportunity, i) => <OpportunityRow key={i} content={opportunity} onClick={this.toDetails}/>)}
                </tbody>
              </table>
            </div>
          </div> : null
        }

        {achievedResult ?
          <div className="carnovo-row">
            <div className="easy-table">
              <table>
                <EasyTableHeaders
                  toggleSort={::this.toggleAchievedSort}
                  sort={this.state.sort_act}
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
                  ]}
                  emptyColumn={true}/>
                <tbody>
                {achieved.map((activity, j) => <OpportunityRow key={j} content={activity} onClick={this.toDetails} showToolbox={this.toActions}/>)}
                </tbody>
              </table>
            </div>
          </div> : null
        }

      </div>
    );
  }
}
