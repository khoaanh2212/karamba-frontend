import pendingDealersReducer from 'reducers/pendingDealersReducer';

describe("pendingDealersReducer", () => {

    const PendingDealersDomain = 'pendingDealers';
    const initialState = {
        isFetching: false,
        errorMessage: null,
        pendingDealers: []
    };

    const reducer = (action, initialState) => pendingDealersReducer(initialState, action);

    it("should return initial state", ()=>{
        expect(reducer({}, initialState)).to.deep.equal(initialState);
    });

    it("should return payload if domain is correct but action is not in the switch", () => {
        let action = {
            type: 'fake type',
            domain: PendingDealersDomain,
            payload: {isTrue: true}
        };
        expect(reducer(action, initialState)).to.deep.equal({isTrue: true})
    });

    it("should remove one dealer when action type is ACCEPT_DEALER_SUCCESS", () => {
        let action = {
            type: 'ACCEPT_DEALER_SUCCESS',
            domain: PendingDealersDomain,
            dealerId: 1
        };

        let stateWithDealers = {
            pendingDealers: [
                {id: 1}, {id: 2}, {id: 3}
            ]
        };
        let expected = reducer(action, stateWithDealers);
        expect(expected).to.deep.equal({pendingDealers: [{id:2},{id:3}], errorMessage:null});
    });
    
    it("should set error message when action type is ACCEPT_DEALER_ERROR", () => {
        let action = {
            type: 'ACCEPT_DEALER_ERROR',
            domain: PendingDealersDomain,
            dealerId: 1
        };

        let stateWithDealers = {
            pendingDealers: [
                {id: 1, dealerName: 'name-for-test'}
            ]
        };
        let expected = reducer(action, stateWithDealers);
        expect(expected.errorMessage).contains('name-for-test');
    });
    
    it("should remove one dealer when action type is REJECT_DEALER_SUCCESS", () => {
        let action = {
            type: 'REJECT_DEALER_SUCCESS',
            domain: PendingDealersDomain,
            dealerId: 1
        };

        let stateWithDealers = {
            pendingDealers: [
                {id: 1}, {id: 999}
            ]
        };

        let expected = reducer(action, stateWithDealers);
        expect(expected).to.deep.equal({pendingDealers: [{id:999}], errorMessage:null});
    });

    it("should set errorMessage action type is REJECT_DEALER_ERROR", () => {
        let action = {
            type: 'REJECT_DEALER_ERROR',
            domain: PendingDealersDomain,
            dealerId: 1
        };

        let stateWithDealers = {
            pendingDealers: [
                {id: 1, dealerName:'name-for-test'}
            ]
        };

        let expected = reducer(action, stateWithDealers);
        expect(expected.errorMessage).contains('name-for-test');
    });

    it("should concat dealers when action type is FETCH_PENDING_DEALERS_SUCCESS", () => {
        let action = {
            type: 'FETCH_PENDING_DEALERS_SUCCESS',
            domain: PendingDealersDomain,
            pendingDealers: [{id:3}]
        };

        let stateWithDealers = {
            pendingDealers: [
                {id: 1}
            ]
        };

        let expected = reducer(action, stateWithDealers);
        expect(expected).deep.equals({pendingDealers:[{id:1}, {id:3}], isFetching: false, errorMessage: null});
    });
});