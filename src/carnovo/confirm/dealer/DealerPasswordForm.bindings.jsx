import {confirmDealer} from 'services/DealerConfirm.service';

export const dealerPasswordStateToPropsBinding = (state, ownProps) => ({
  initialValues: {
    ...state.dealerPassword.dealerPassword,
    token: ownProps.routeToken
  }
});

export const dealerPasswordDispatchToPropsBinding = (dispatch, ownProps) => ({
  onDealerConfirmRegistration: dealerPassword => {
    confirmDealer(dealerPassword).then(dispatch)
  }
});
