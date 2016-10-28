import reducerFactory from 'shared/utils/ReducerFactory';
import {find, map} from 'lodash';
export const NEW = "new";
export const NEW_OPPORTUNITY = "new_opportunity";
export const NEW_MESSAGE = "new message";
export const SENT_OFFER = "sent_offer";
export const REPLIED = "replied";
export const WITHDRAWN = "withdrawn";
export const WON = "won";
export const LOST = "lost";
export const OTHERS = "others";
export const ARCHIVED = 'archived';
export const CLOSED = 'closed';
export const EXPIRED = 'offer_expired';
export const FETCH_OPPORTUNITIES_SUCCESS = 'FETCH_OPPORTUNITIES_SUCCESS';
export const FETCH_OPPORTUNITY_SUCCESS = 'FETCH_OPPORTUNITY_SUCCESS';
export const FETCH_OPPORTUNITIES_ERROR = 'FETCH_OPPORTUNITIES_ERROR';
export const FETCH_OPPORTUNITY_ERROR = 'FETCH_OPPORTUNITY_ERROR';
export const FETCH_OPPORTUNITY_ARCHIVED_SUCCESS = 'FETCH_OPPORTUNITY_ARCHIVED_SUCCESS';
export const FETCH_OPPORTUNITY_ARCHIVED_ERROR = 'FETCH_OPPORTUNITY_ARCHIVED_ERROR';
export const MAKE_OFFER_SUCCESS = 'MAKE_OFFER_SUCCESS';
export const MAKE_OFFER_ERROR = 'MAKE_OFFER_ERROR';
export const VERIFY_OFFER = 'VERIFY_OFFER';
export const UNVERIFY_OFFER = 'UNVERIFY_OFFER';
export const COMMIT_OFFER = 'COMMIT_OFFER';
export const OpportunitiesDomain = 'OpportunitiesDomain';
export const initialState = {
    loading: true,
    error: null,
    opportunities: [],
    selectedOpportunity: {},
    selectedOffer: {},
    isVerified: false
};

let onMadeOffer = (state, opportunityId) => {
    let opportunities = [...state.opportunities];
    let opportunity = find(opportunities, function (opt) {
        return opt.id === opportunityId;
    });
    opportunity.state = SENT_OFFER;
    return {...state, opportunities: opportunities};
};

let fetchOpportunitiesSuccess = (state, action) => {
    let opportunities = handleOpportunities(action.opportunities);
    return {
        ...state,
        error: null,
        loading: false,
        opportunities: opportunities
    }
};

let fetchOpportunitiesArchivedSuccess = (state, action) => {
    let opportunities = handleOpportunities(action.opportunities);
    return {
        ...state,
        error: null,
        loading: false,
        opportunities: opportunities
    }
};

let handleOpportunities = (opportunities) => {
    opportunities.map((opportunity) => {
        let summaryExtraPrice = calculateSumPriceExtras(opportunity.extras);
        if (opportunity.package) {
            summaryExtraPrice += opportunity.package.price;
        }
        opportunity.summaryExtraPrice = summaryExtraPrice;
    });
    return opportunities;
}

let calculateSumPriceExtras = (extras) => {
    let summaryPrice = 0;
    extras.map((extra, index) => {
        if (!isNaN(extra.price))
            summaryPrice += extra.price;
    });
    return summaryPrice;
};

let cases = (state, action) => {
    switch (action.type) {
        case FETCH_OPPORTUNITIES_SUCCESS:
            return fetchOpportunitiesSuccess(state, action);
        case FETCH_OPPORTUNITIES_ERROR:
            return {...state, error: action.error, loading: false, opportunities: []};
        case FETCH_OPPORTUNITY_SUCCESS:
            return {...state, error: null, loading: false, selectedOpportunity: action.opportunity};
        case FETCH_OPPORTUNITY_ERROR:
            return {...state, error: action.error, loading: false, selectedOpportunity: []};
        case MAKE_OFFER_SUCCESS:
            return onMadeOffer(state, action.opportunityId);
        case MAKE_OFFER_ERROR:
            return {...state, error: action.error, loading: false};
        case VERIFY_OFFER:
            return {...state, isVerified: true};
        case UNVERIFY_OFFER:
            return {...state, isVerified: false, makingOffer: null};
        case COMMIT_OFFER:
            return {...state, makingOffer: action.makingOffer};
        case FETCH_OPPORTUNITY_ARCHIVED_SUCCESS:
            return fetchOpportunitiesArchivedSuccess(state, action);
        case FETCH_OPPORTUNITY_ARCHIVED_ERROR:
            return {...state, error: action.error, loading: false, opportunities: []};
    }
};

export default reducerFactory(initialState, OpportunitiesDomain, cases);
