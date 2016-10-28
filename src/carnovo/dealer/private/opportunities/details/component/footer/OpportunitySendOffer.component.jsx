import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import EasyButton from 'shared/components/EasyComponents/EasyButton.component';

export default class OpportunitySendOffer extends React.Component {
  onBack() {
    this.props.onStepBack();
  }

  render() {
    return (
      <div className="grid confirmOfferContainer">
        <EasyButton position="left" label="Atrás" onSubmit={::this.onBack}/>
        <EasyButton position="right send-offer" label="Enviar oferta" onSubmit={this.props.sendOffer}/>
      </div>
    );
  }
}
