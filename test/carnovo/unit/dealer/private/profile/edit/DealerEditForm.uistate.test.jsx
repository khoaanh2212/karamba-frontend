import {DealerEditFormUiReducer} from 'dealer/private/edit/DealerEditForm.uistate';
import {fromJS, Map, List} from 'immutable';

describe("[unit] DealerEditForm.uistate", () => {
  const initialState = Map({
    error: null,
    profile: null,
    conditions: List([]),
    loading: true
  });

  const reducer = (action, state = initialState) => DealerEditFormUiReducer(state, action);

  it("should return initial state", () => {
    expect(reducer({})).to.deep.equal(initialState)
  });

  it("should return error null if action type is UPDATE_DEALER_SUCCESS", () => {
    let stateWithErrors = Map({
      loading: false,
      error: 'An error',
      profile: null,
      conditions: List([])
    });

    let successAction = {
      type: 'UPDATE_DEALER_SUCCESS',
      profile: Map({
        username: 'user',
        avatar: 'avatar',
        background: 'background'
      })
    };

    const nextState = reducer(successAction, stateWithErrors);
    expect(JSON.stringify(nextState)).to.contain('"error":null');
  });

  it("should return an error if action type is UPDATE_DEALER_ERROR", () => {
    let errorAction = {
      type: 'UPDATE_DEALER_ERROR',
      error: 'An error'
    };

    const nextState = reducer(errorAction);

    expect(nextState).to.be.equal(fromJS({loading: false, error: 'An error', profile: null, conditions: []}));
  });

  it("should return the profile without error if action type is FETCH_DEALER_SUCCESS", () => {
    let stateWithErrors = Map({
      error: 'An error',
      profile: null,
      conditions: List([])
    });

    let fetchSuccessAction = {
      type: 'FETCH_DEALER_SUCCESS',
      profile: Map({
        username: 'user'
      }),
      conditions: [
        {"id": 1, "text": "CONDITION_1"},
        {"id": 2, "text": "CONDITION_2"}
      ]
    };

    const nextState = reducer(fetchSuccessAction, stateWithErrors);

    expect(nextState).to.be.equal(fromJS({
      loading: false,
      error: null,
      profile: {username: 'user'},
      conditions: [
        {"id": 1, "text": "CONDITION_1"},
        {"id": 2, "text": "CONDITION_2"}
      ]
    }));
  });

  it("should return error without profile if action type FETCH_DEALER_ERROR", () => {
    let fetchErrorAction = {
      type: 'FETCH_DEALER_ERROR',
      error: 'Random error'
    };

    const nextState = reducer(fetchErrorAction);

    expect(nextState).to.be.equal(fromJS({loading: false, error: 'Random error', profile: null, conditions: []}));
  });
});
