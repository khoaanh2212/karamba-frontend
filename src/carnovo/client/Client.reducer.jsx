import reducerFactory from 'shared/utils/ReducerFactory';

export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';
export const CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR';
export const FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS';
export const FETCH_CLIENT_ERROR = 'FETCH_CLIENT_ERROR';
export const CREATE_CAR_APPLIANCE_SUCCESS = 'CREATE_CAR_APPLIANCE_SUCCESS';
export const CREATE_CAR_APPLIANCE_ERROR = 'CREATE_CAR_APPLIANCE_ERROR';
export const FETCH_APPLIANCES_SUCCESS = 'FETCH_APPLIANCES_SUCCESS';
export const FETCH_APPLIANCES_ERROR = 'FETCH_APPLIANCES_ERROR';
export const DELETE_APPLIANCE_SUCCESS = 'DELETE_APPLIANCE_SUCCESS';
export const DELETE_APPLIANCE_ERROR = 'DELETE_APPLIANCE_ERROR';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_ERROR = 'UPDATE_CLIENT_ERROR';
export const ClientDomain = 'ClientDomain';
export const initialState = {
  error: null,
  appliances: [],
  profile: {
    name: '',
    email: '',
    zipCode: '',
    password: ''
  },
  loading: true,
  error: null
};

let onDeleteAppliance = (state, appliances, applianceId) => ({
  ...state,
  appliances: appliances.filter(a => a.id !== applianceId)
});

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_APPLIANCES_SUCCESS:
      return {...state, appliances: action.appliances };
    case DELETE_APPLIANCE_SUCCESS:
      return onDeleteAppliance(state, state.appliances, action.applianceId);
    case FETCH_CLIENT_SUCCESS:
      return {...state, loading: false, error: null, profile: action.profile};
  }
};

export default reducerFactory(initialState, ClientDomain, cases);


