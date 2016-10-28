import {DealerHomeUiReducer} from 'dealer/home/DealerHome.uistate';
import {fromJS, Map} from 'immutable';

describe("[unit] DealerHome.uistate", () => {
    const initialState = Map({
        registered: true,
        error: null
    });

    const reducer = (action, state = initialState) => DealerHomeUiReducer(state, action);

    it("should return initial state", () => {
        expect(reducer({})).to.deep.equal(initialState)
    });

    it("when action with type is PENDING_DEALER_REGISTER_SUCCESS should return registered true without errors", () => {
        let stateWithErrors = Map({
            registered: false,
            error: 'An error'
        });

        let successAction = {
            type: 'PENDING_DEALER_REGISTER_SUCCESS'
        };

        const nextState = reducer(successAction, stateWithErrors);

        expect(nextState).to.be.equal(fromJS({registered: true, error: null}));
    });

    it("when action with type is PENDING_DEALER_REGISTER_FAILURE should return registered false with error", () => {
        let registeredState = Map({
            registered: true,
            error: null
        });

        let successAction = {
            type: 'PENDING_DEALER_REGISTER_FAILURE',
            error: 'Random error'
        };

        const nextState = reducer(successAction, registeredState);

        expect(nextState).to.be.equal(fromJS({registered: false, error: 'Random error'}));
    });
});