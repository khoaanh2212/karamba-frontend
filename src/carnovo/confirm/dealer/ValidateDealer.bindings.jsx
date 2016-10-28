import {fetchPendingDealerFromToken} from "services/ValidateDealer.service.js";

export const mapStateToProps = (state) => ({
  dealerPassword: state.dealerPassword
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoadComponent: () => fetchPendingDealerFromToken(ownProps.routeParams.token)
    .then(dispatch)
});
