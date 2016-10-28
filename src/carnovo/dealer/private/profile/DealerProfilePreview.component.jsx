import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import TabMenu from 'shared/components/TabMenu.component'
import DealerProfileAvatar from '../../../widgets/DealerProfileAvatar.component';
import Notifications from 'react-notification-system-redux';
import ReviewDetail from '../../../client/feature/showroom/offers/details/components/ReviewDetail.component';

export default class DealerProfilePreview extends Component {
  checkNotifications(){
    if (this.props.profile.updated && this.props.notificationStatus) {
      this.showInfo(<div><strong>Datos guardados.</strong> El perfil ha sido actualizado </div>);
        let status = false;
        this.props.notification(status);
    }
  }

  showInfo(message) {
    let notificationOpts = {
      message: message,
      position: 'bc',
      autoDismiss: 2
    };

    this.props.toast(Notifications.info(notificationOpts));
  }

  gotoEdit() {
    browserHistory.push(process.env.PUBLIC_PATH+"dealer/profile/edit");
  }

  render() {
    this.checkNotifications();
    let profile = this.props.profile;
    let tabs = [
      {key: "Perfil", link: "/dealer/profile"},
      {key: "Valoraciones", link: "/dealer/profile/valuations"}
    ];
    return (
      <div>
        <DealerProfileAvatar profile={profile} action={{name: 'Editar', go: this.gotoEdit}}></DealerProfileAvatar>
        <TabMenu tabs={tabs}/>
          {this.props.path=='/dealer/profile'?
            <div>
                <div className="row">
                  <div className="profile-block left title">
                    Contacta con {profile.name} de {profile.vendorName}
                  </div>
                  <div className="profile-block right title">
                    Horario
                  </div>
                </div>
                <div className="row">
                  <div className="profile-block left content">
                    Llama a {profile.name} para resolver cualquier duda o realizar tu pedido. No dudes en ponerte en contacto para visitar el showroom o reservar un test drive. Recuerda mencionar tu ID de oferta o imprimir tu oferta y traerla contigo.
                  </div>
                  <div className="profile-block right content">
                    {profile.schedule}
                  </div>
                </div>
                <div className="row">
                  <div className="profile-block left title">
                    Política de entrega
                  </div>
                  <div className="profile-block right title">
                    Información adicional
                  </div>
                </div>
                <div className="row">
                  <div className="profile-block left content">
                    {profile.deliveryConditions}
                  </div>
                  <div className="profile-block right content">
                    {profile.specialConditions}
                  </div>
                </div>
            </div>:<ReviewDetail reviews={this.props.rating} onLoadMore={this.props.onLoadMore}
                                 role={this.props.role}
                                 acceptReview={this.props.acceptReview} rejectReview={this.props.rejectReview}/>}
      </div>
    );
  }
}



