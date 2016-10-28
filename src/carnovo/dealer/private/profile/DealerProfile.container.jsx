import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import DealerProfilePreview from './DealerProfilePreview.component';
import ReviewDetail from '../../../client/feature/showroom/offers/details/components/ReviewDetail.component';
import {
    DealerProfileToPropsBinding,
    DealerProfileDispatchToPropsBinding
} from "./DealerProfile.bindings";

@connect(DealerProfileToPropsBinding, DealerProfileDispatchToPropsBinding)
export default class DealerProfile extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
        this.props.getRatings(this.props.token);
    }

    onLoadMore() {
        this.props.loadmoreReviewList();
    }

    rejectReview(reviewId) {
        this.props.rejectReview(this.props.token, reviewId);
    }

    acceptReview(reviewId) {
        this.props.acceptReview(this.props.token, reviewId);
    }

    render() {
        return (
            <div id="login-main">
                <Helmet {...config.app.head}/>
                <DealerProfilePreview profile={this.props.profile} notification={this.props.notification}
                                      toast={this.props.toast}
                                      role={this.props.role}
                                      notificationStatus={this.props.notificationStatus}
                                      rating={this.props.rating}
                                      path={this.props.location.pathname} onLoadMore={::this.onLoadMore}
                                      acceptReview={::this.acceptReview}
                                      rejectReview={::this.rejectReview}/>
            </div>
        );
    }
}
