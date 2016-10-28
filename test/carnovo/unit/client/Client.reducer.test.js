import ClientReducer, {
  initialState, DELETE_APPLIANCE_SUCCESS, ClientDomain
} from 'client/Client.reducer';

describe('[unit] Client.reducer', function () {
  const reducer = (action, state = initialState) => ClientReducer(state, action);

  it('should return initial state', function () {
    let defaultState = reducer({});

    expect(defaultState).to.deep.equal(initialState);
  });

  it('should return array of car appliances without the deleted appliance on ' + DELETE_APPLIANCE_SUCCESS, function () {
    let initial = {
      error: null,
      appliances: [
        {id: 1}, {id: 2}, {id: 3}
      ]
    };

    let deleteAction = {
      type: DELETE_APPLIANCE_SUCCESS,
      domain: ClientDomain,
      applianceId: 2
    };

    let nextState = reducer(deleteAction, initial);

    expect(nextState.appliances).to.deep.equal([
      {id: 1}, {id: 3}
    ])
  });
});
