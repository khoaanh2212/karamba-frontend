import {
    DEALER_FINISH_UPDATE_NOTIFICATION_OFF,
    NotificationStatusDomain
} from '../../../notification/Notification.reducer';
import {fetchRating, acceptReview, rejectReview} from '../../../services/Dealer.service';
import {ON_LOAD_MORE_REVIEW_LIST, DealerProfileDomain} from './DealerProfile.reducer';

let clearNotificationAfterUpdated = (status) => ({
    type: DEALER_FINISH_UPDATE_NOTIFICATION_OFF,
    domain: NotificationStatusDomain,
    status
});
let loadMore = () => ({type: ON_LOAD_MORE_REVIEW_LIST, domain: DealerProfileDomain});
export const DealerProfileToPropsBinding = (state, ownProps) => {
    return {
        notificationStatus: state.notificationStatus.justUpdatedDealer,
        rating: state.dealerProfile.rating,
        token: state.auth.token,
        role: state.auth.role
    };
};

export const DealerProfileDispatchToPropsBinding = (dispatch, ownProps) => ({
    toast: notification => dispatch(notification),
    notification: (status) => dispatch(clearNotificationAfterUpdated(status)),
    getRatings: (token) =>fetchRating(token).then(dispatch),
    loadmoreReviewList: () => dispatch(loadMore()),
    rejectReview: (token, reviewId) => rejectReview(token, reviewId).then(dispatch),
    acceptReview: (token, reviewId) => acceptReview(token, reviewId).then(dispatch)
});
