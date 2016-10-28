import {DealerConfirmUiReducer} from 'confirm/dealer/DealerPasswordForm.uistate';
import {fromJS, Map} from 'immutable';

describe("[unit] DealerConfirmForm.uistate", () => {
    const initialState = Map({
        error: null
    });

    const reducer = (action, state = initialState) => DealerConfirmUiReducer(state, action);

    it("should return initial state", () => {
        expect(reducer({})).to.deep.equal(initialState)
    });

    it("when action with type is FETCH_DEALER_CONF_SUCCESS should return a null error", () => {
        let stateWithErrors = Map({
            error: 'An error'
        });

        let successAction = {
            type: 'FETCH_DEALER_CONF_SUCCESS'
        };

        const nextState = reducer(successAction, stateWithErrors);

        expect(nextState).to.be.equal(fromJS({error: null}));
    });

    it("when action with type is PENDING_DEALER_REGISTER_FAILURE should return a custom error", () => {
        let successAction = {
            type: 'FETCH_DEALER_CONF_ERROR',
            error: 'Random error'
        };

        const nextState = reducer(successAction);

        expect(nextState).to.be.equal(fromJS({error: 'Random error'}));
    });
});
