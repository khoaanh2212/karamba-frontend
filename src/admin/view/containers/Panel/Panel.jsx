import React from 'react';
import {connect} from 'react-redux';
import {PanelPropsBindings, PanelDispatchBindings} from './PanelBindings';
import PendingDealersList from '../../components/PendingDealersList';
import ErrorBox from '../../components/errors/errorBox';

export class Panel extends React.Component {

    componentDidMount() {
        this.props.fetchPendingDealers(this.props.token);
    }

    render() {
        const {onAcceptPendingDealer, onRejectPendingDealer, pendingDealers, token} = this.props;
        return (
            <div>
                {pendingDealers.errorMessage ? <ErrorBox message={pendingDealers.errorMessage}/> : null}
                <PendingDealersList 
                    pendingDealers={pendingDealers.pendingDealers}
                    onAcceptPendingDealer={onAcceptPendingDealer}
                    onRejectPendingDealer={onRejectPendingDealer}
                    token={token}
                />
            </div>
        );
    }
}

export default connect(PanelPropsBindings, PanelDispatchBindings)(Panel);

