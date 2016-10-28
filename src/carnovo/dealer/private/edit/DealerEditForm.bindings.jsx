import {updateDealer} from 'services/UpdateDealer.service';
import {browserHistory} from 'react-router';
import {
    DEALER_FINISH_UPDATE_NOTIFICATION_ON,
    NotificationStatusDomain
} from '../../../notification/Notification.reducer';

let finishUpdateDealer = (status) => ({
    type: DEALER_FINISH_UPDATE_NOTIFICATION_ON,
    domain: NotificationStatusDomain,
    status
});

let status = true;

export const dealerEditFormStateToPropsBinding = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps.profile
    },
    token: state.auth.token
  };
};

export const dealerEditFormDispatchToPropsBinding = (dispatch, ownProps) => ({
  onUpdateDealer: (updatedDealer, token) => {
    let fd = new FormData();
    if (updatedDealer.avatar && typeof updatedDealer.avatar.name === 'string') {
      fd.append('avatar', updatedDealer.avatar);
    }

    if (updatedDealer.background && typeof updatedDealer.background.name === 'string') {
      fd.append('background', updatedDealer.background);
    }

    delete updatedDealer.avatar;
    delete updatedDealer.background;

    updatedDealer.generalConditions = updatedDealer.generalConditions.map(condition => condition.id);
    fd.append('updateData', JSON.stringify(updatedDealer));

    updateDealer(fd, token)
      .then(dispatch)
      .then(()=>{
        dispatch(finishUpdateDealer(status));
        window.scrollTo(0,0);
        browserHistory.push(process.env.PUBLIC_PATH + "dealer/profile");
    });
  }
});
