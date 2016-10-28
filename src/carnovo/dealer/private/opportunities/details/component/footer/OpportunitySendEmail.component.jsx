import React, {Component} from 'react';
import EasyButton from 'shared/components/EasyComponents/EasyButton.component';

export default class OpportunitySendEmail extends React.Component {
  render() {
    return (
      <div className="grid confirmOfferContainer">
        <EasyButton position="right" label="Exportar ficha"/>
        <div className="easy-button left">
          <button type="button">Enviar mensaje</button>
          <div className="mail-icon"></div>
        </div>
      </div>
    );
  }
}
