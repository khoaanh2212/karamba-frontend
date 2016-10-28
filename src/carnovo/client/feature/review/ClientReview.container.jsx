import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ClientReviewToPropsBinding, ClientReviewDispatchToPropsBinding} from './ClientReview.bindings';
import {browserHistory} from 'react-router';
import EasyButton from '../../../shared/components/EasyComponents/EasyButton.component';
import StepProgessBar from './components/StepProgressBar.component';
import FlowFirst from './components/FlowFirst.component';
import FlowSecond from './components/FlowSecond.component';
import FlowThird from './components/FlowThird.component';
import ErrorBox from '../../../shared/components/ErrorBox.component';
import ScrollToElement from '../../../shared/utils/ScrollToElement';

@connect(ClientReviewToPropsBinding, ClientReviewDispatchToPropsBinding)
export default class ClientReview extends Component {
  state = {
    current: 1,
    dealerId: "",
    business: "",
    name: "",
    giftSelected: {},
    ratings: [],
    comment: "",
    errMsg: ""
  };

  componentWillMount() {
    this.props.fetchDealersList(this.props.token);
    this.props.fetchGifts(this.props.token);
  }

  componentDidMount() {
    this.updateCurrentProcess(this.state.current);
  }

  onSubmit() {
    let flag = false;
    this.setState({errMsg: ""});
    let {
      current,
      dealerId,
      business,
      name,
      giftSelected,
      ratings,
      comment
    } = this.state;

    if (current == 1) {
      flag = !!dealerId && !!name;

      if (!flag) {
        if (!dealerId) {
          this.setState({errMsg: "Elija un concesionario, por favor."});
        } else if (!name) {
          this.setState({errMsg: "Introduzca su nombre, por favor."});
        } else {
          this.setState({errMsg: "Introduzca la información que falta, por favor."});
        }
      }
    }

    if (current == 2) {
      flag = !!giftSelected.id;
      if (!flag) {
        this.setState({errMsg: "Por favor, selecciona tu regalo."});
      }
    }

    if (current == 3) {
      // send review
      // update flag when success
      this.props.sendReview(this.props.token, {
        // REVIEW INFORMATION
        dealerId: dealerId,
        giftId: giftSelected.id,
        reviewerFullName: name,
        reviewerBusinessName: business,
        comment: comment,
        ratings: ratings
      });
      flag = true;
    }

    if (current == 4) {
      // in fourth screen
      // back to showroom?
      browserHistory.push(process.env.PUBLIC_PATH + 'client/showroom');
      return;
    }

    if (flag) {
      // PASS VALIDATION
      this.setState({current: current + 1});
      ScrollToElement("#container")
    }
  }

  updateCurrentProcess(step) {
    switch (step) {
      case 1:
        return [
          {label: "", process: "current"},
          {label: "", process: ""},
          {label: "", process: ""},
        ];
      case 2:
        return [
          {label: "", process: "completed"},
          {label: "", process: "current"},
          {label: "", process: ""},
        ];
      case 3:
        return [
          {label: "", process: "completed"},
          {label: "", process: "completed"},
          {label: "", process: "current"},
        ];
      case 4:
        return [
          {label: "", process: "completed"},
          {label: "", process: "completed"},
          {label: "", process: "completed"},
        ];
      default:
        break;
    }
  }

  updateTexts() {
    return [
      {heading: "¡Gracias por comprar en carnovo!", highlight: "", desc: "Deja tu opinión sobre tu experiencia con este concesionario y recibirás una recompensa a escoger en la siguiente pantalla."},
      {heading: "Selecciona", highlight: "tu regalo", desc: "Selecciona tu regalo y, después de dejar tu valoración lo recibirás."},
      {heading: "Escribe una valoración para ", highlight: "Seat Sant Cugat", desc: "iYa casi has terminado! Escribe tu valiranción y empieza a disfrutar de tu regalo."},
      {heading: "iFelicidades, ", highlight: "has enviado tu valoración", desc: "Gracias por dejar tu valoración. En cuanto el concesionario confirme la venta recibir recibirás tu regalo a tu email."}
    ][this.state.current - 1];
  }

  saveInformation(info) {
    this.setState(info);
  }

  getContent() {
    let flow = '';
    switch (this.state.current) {
      case 1:
        flow = <FlowFirst dealers={this.props.dealers} updateInfo={::this.saveInformation}/>;
        break;
      case 2:
        flow = <FlowSecond gifts={this.props.gifts} updateInfo={::this.saveInformation}/>;
        break;
      case 3:
        flow = <FlowThird gift={this.state.giftSelected} updateInfo={::this.saveInformation}/>;
        break;
      case 4:
        // this flow does not required template
        break;
      default:
        break;
    }
    return flow
  }

  render() {
    let texts = this.updateTexts();

    return(
      <div className="client-review">
        <div className="process-wrapper">
          <StepProgessBar steps={this.updateCurrentProcess(this.state.current)}/>
        </div>
        <div className="title">
          {texts.heading}
          <span className="highlight"> {texts.highlight}</span>
          <div className="desc">{texts.desc}</div>
        </div>
        <hr/>
        {this.state.errMsg !== "" ?
          <ErrorBox message={this.state.errMsg}/>
        : null}
        {this.state.current !== 4 ?
          <div className="carnovo-row content-wrapper">
            {this.getContent()}
          </div> : null}

        <div className="actions">
          <EasyButton position="center" label={this.state.current == 3 ? 'Enviar' : (this.state.current == 4 ? 'Volver a carnovo' : 'Siguiente')} onSubmit={::this.onSubmit}/>
        </div>
      </div>
    )
  }
}

