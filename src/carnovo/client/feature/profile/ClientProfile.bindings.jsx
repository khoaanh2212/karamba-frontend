import {clientUpdate} from '../../../services/Client.service'
import {browserHistory} from 'react-router';
import Notifications from 'react-notification-system-redux';

export const ClientProfileToPropsBinding = (state, ownProps) => {
  return {
    token: state.auth.token,
    initialValues: {
      ...ownProps.profile
    }
  };
};

export const ClientProfileDispatchToPropsBinding = (dispatch, ownProps) => ({
  updateClient: (updatedClient, token) => {
    let fd = new FormData();
    fd.append('updateData', JSON.stringify(updatedClient));
    clientUpdate(fd, token)
      .then(dispatch)
      .then(()=>{
        dispatch(Notifications.info({
          message: "Update information successful",
          position: 'bc',
          autoDismiss: 2
        }));
        window.scrollTo(0,0);
    });
  }
});
