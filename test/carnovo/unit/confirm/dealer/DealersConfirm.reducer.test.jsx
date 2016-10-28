import dealersReducer, {
  FETCH_DEALER_CONFIRM_SUCCESS,
  FETCH_DEALER_CONFIRM_ERROR
} from 'confirm/dealer/ValidateDealer.reducer';

describe("[unit] dealers.confirm", () => {
  const dealersDomain = 'dealersConfirm';
  const notdealersDomain = 'notDealersConfirm';
  const initialState = {
    error: null,
    loading: true,
    dealerPassword: {}
  };

  const reducer = (action, state = initialState) => dealersReducer(state, action);

  it("should return initial state", () => {
    expect(reducer({})).to.deep.equal(initialState)
  });

  it("should return payload if the action has the dealersConfirm domain and is not contemplated in the switch", () => {
    let actionWithPayload = {
      domain: dealersDomain,
      state: {token: 'fake1234'}
    };

    expect(reducer(actionWithPayload)).to.deep.equal({token: 'fake1234'})
  });

  it('should return state dealer data if token is valid', function () {
    let actionSuccess = {
      type: FETCH_DEALER_CONFIRM_SUCCESS,
      domain: dealersDomain,
      dealerPassword: {
        "id": "08808548-f820-447d-8fa8-706c77c2850b",
        "vendorName": "Dealer Name 17",
        "dealerName": "Vendor Name 17",
        "phoneNumber": "666112233",
        "email": "fake17@email.com",
        "howArrivedHere": "Friends"
      }
    };

    let newState = reducer(actionSuccess, {
      error: "Error message",
      dealerPassword: {}
    });

    expect(newState).to.deep.equal({
      error: null,
      dealerPassword: {
        "id": "08808548-f820-447d-8fa8-706c77c2850b",
        "vendorName": "Dealer Name 17",
        "dealerName": "Vendor Name 17",
        "phoneNumber": "666112233",
        "email": "fake17@email.com",
        "howArrivedHere": "Friends"
      },
      loading: false
    });
  });

  it('should return state with an error an empty dealer application if token is invalid', function () {
    let actionFailure = {
      type: FETCH_DEALER_CONFIRM_ERROR,
      domain: dealersDomain,
      error: 'Invalid token'
    };

    let newState = reducer(actionFailure);
    expect(newState).to.deep.equal({
      dealerPassword: {},
      error: 'Invalid token',
      loading: false
    })
  });

  it('should return previous state with a non dealers domain', function () {
    let nonActionDomain = {
      type: 'UNDEFINED_TYPE',
      domain: notdealersDomain,
      error: 'Error message'
    };

    let newState = reducer(nonActionDomain);
    expect(newState).to.deep.equal(initialState)
  });
});
