import brandsReducer, {
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
  FETCHING_MODELS_BRAND,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_ERROR,
  initialState,
  CarsDomain
} from 'hoc/cars.reducer';

describe("[unit] cars.reducer", () => {
  const reducer = (action, state = initialState) => brandsReducer(state, action);

  it("should return initial state", () => {
    expect(reducer({})).to.deep.equal(initialState)
  });

  it('should return brands if action type is ' + FETCH_BRANDS_SUCCESS, function () {
    let successAction = {
      type: FETCH_BRANDS_SUCCESS,
      domain: CarsDomain,
      brands: [
        {id: 1, name: 'BMW'},
        {id: 2, name: 'Honda'},
        {id: 3, name: 'Mercedes'}
      ]
    };

    let newState = reducer(successAction);

    expect(newState).to.deep.equal({
      error: null,
      loading: false,
      models: {},
      brands: [
        {id: 1, name: 'BMW'},
        {id: 2, name: 'Honda'},
        {id: 3, name: 'Mercedes'}
      ]
    })
  });

  it('should return an error if action type is ' + FETCH_BRANDS_ERROR, function () {
    let errorAction = {
      type: FETCH_BRANDS_ERROR,
      domain: CarsDomain,
      error: 'An error'
    };

    let newState = reducer(errorAction);

    expect(newState).to.deep.equal({
      error: 'An error',
      loading: false,
      brands: [],
      models: {}
    })
  });

  it('should return empty models when ' + FETCHING_MODELS_BRAND, function () {
    let fetchingAction = {
      type: FETCHING_MODELS_BRAND,
      domain: CarsDomain,
      brand: 'Audi'
    };

    let newState = reducer(fetchingAction);

    expect(newState.models['Audi']).to.deep.equal({
      error: null,
      models: []
    });
  });

  it('should return models from selected brand on ' + FETCH_MODELS_SUCCESS, function () {
    let successAction = {
      type: FETCH_MODELS_SUCCESS,
      domain: CarsDomain,
      brand: 'Audi',
      models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]
    };

    let newState = reducer(successAction);

    expect(newState).to.deep.equal({
      error: null,
      loading: false,
      brands: [],
      models: {'Audi': {error: null, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]}}
    })
  });

  it('should return error without change brands/models on ' + FETCH_MODELS_ERROR, function () {
    let initialState = {
      error: null,
      loading: false,
      brands: ['Audi', 'BMW'],
      models: {'Audi': {error: false, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]}}
    };

    let errorAction = {
      type: FETCH_MODELS_ERROR,
      domain: CarsDomain,
      brand: 'BMW',
      error: 'An error'
    };

    let newState = reducer(errorAction, initialState);

    expect(newState).to.deep.equal({
      error: null,
      loading: false,
      brands: ['Audi', 'BMW'],
      models: {
        'Audi': {error: false, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]},
        'BMW': {error: 'An error', models: []}
      }
    });
  });

  it('should return models and remove the error when it exists', function () {
    let initialState = {
      error: null,
      loading: false,
      brands: ['Audi', 'BMW'],
      models: {
        'Audi': {error: null, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]},
        'BMW': {error: 'The error', models: []}
      }
    };

    let successAction = {
      type: FETCH_MODELS_SUCCESS,
      domain: CarsDomain,
      brand: 'BMW',
      models: [{"brand":"BMW","name":"x1","year":"2017"},{"brand":"BMW","name":"x3","year":"2016"}]
    };

    let newState = reducer(successAction, initialState);

    expect(newState.models).to.deep.equal({
      'Audi': {error: null, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]},
      'BMW': {error: null, models: [{"brand":"BMW","name":"x1","year":"2017"},{"brand":"BMW","name":"x3","year":"2016"}]}
    });
  });

  it('should remove actual models if an error exist', function () {
    let initialState = {
      error: null,
      loading: false,
      brands: ['Audi', 'BMW'],
      models: {
        'Audi': {error: null, models: [{"brand":"Audi","name":"A1","year":"2017"},{"brand":"Audi","name":"A3","year":"2016"}]}
      }
    };

    let errorAction = {
      type: FETCH_MODELS_ERROR,
      domain: CarsDomain,
      brand: 'Audi',
      error: 'An error'
    };

    let newState = reducer(errorAction, initialState);

    expect(newState.models['Audi']).to.deep.equal({
      "error": "An error",
      "models": []
    })
  });
});
