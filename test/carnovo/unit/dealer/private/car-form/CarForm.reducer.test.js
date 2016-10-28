import AddCarReducer, {
  initialState, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_ERROR,
  SELECT_BRAND, SELECT_MODEL, SELECT_OPTIONS, FETCH_EXTRAS_SUCCESS,
  FETCHING_ENGINE, EDIT_VEHICLE, CarModelDomain
} from 'dealer/private/car-form/CarForm.reducer';

describe('[unit] CarForm.reducer', function () {
  const reducer = (action, state = initialState) => AddCarReducer(state, action);

  it('should return initial state', function () {
    let defaultState = reducer({});

    expect(defaultState).to.deep.equal(initialState);
  });

  it('should return array of vehicles if action type is ' + FETCH_VEHICLES_SUCCESS, function () {
    let successAction = {
      type: FETCH_VEHICLES_SUCCESS,
      domain: CarModelDomain,
      vehicles: {
        "vehicles": [{
          "vehicleId": 752284520160501,
          "makeKey": "Volkswagen",
          "makeNameToDisplay": "Volkswagen",
          "modelKey": "Golf",
          "modelNameToDisplay": "Golf",
          "modelYearToDisplay": "2017",
          "fuelType": "U",
          "fuelTypeToDisplay": "unleaded",
          "derivative": "Variant BlueMotion 1.0 TSI 115CV",
          "transmission": "M",
          "numberOfDoorsToDisplay": "5",
          "derivativeToDisplay": "Variant BlueMotion 1.0 TSI 115CV"
        }, {
          "vehicleId": 721425420160501,
          "makeKey": "Volkswagen",
          "makeNameToDisplay": "Volkswagen",
          "modelKey": "Golf",
          "modelNameToDisplay": "Golf",
          "modelYearToDisplay": "2017",
          "fuelType": "U",
          "fuelTypeToDisplay": "unleaded",
          "derivative": "Variant Edition 1.2 TSI 110CV BMT",
          "transmission": "M",
          "numberOfDoorsToDisplay": "5",
          "derivativeToDisplay": "Variant Edition 1.2 TSI 110CV BMT"
        }],
        "fuels": ["unleaded", "compressed natural gas", "diesel", "electric"],
        "trans": ["M", "A"],
        "doors": ["5", "3"]
      }
    };

    let newState = reducer(successAction);

    expect(newState.vehicles).to.not.empty;
  });

  it('should return empty array of vehicles if action type is ' + FETCH_VEHICLES_ERROR, function () {
    let errorAction = {
      type: FETCH_VEHICLES_ERROR,
      domain: CarModelDomain,
      error: 'An error'
    };

    let newState = reducer(errorAction);

    expect(newState).to.include({error: 'An error', vehicles: null});
  });

  it('should return selected brand if action type is ' + SELECT_BRAND, function () {
    let successAction = {
      type: SELECT_BRAND,
      domain: CarModelDomain,
      brand: 'Audi'
    };

    let newState = reducer(successAction);

    expect(newState).to.include({
      error: null,
      selectedBrand: 'Audi'
    });
  });

  it('should return selected model if action type is ' + SELECT_MODEL, function () {
    let brandState = {
      ...initialState,
      selectedBrand: 'Audi',
      options: {
        doors: ['1', '3'],
        fuels: ['gasolina', 'diesel'],
        trans: ['A', 'M+']
      }
    };

    let successAction = {
      type: SELECT_MODEL,
      domain: CarModelDomain,
      model: {name: 'A1', year: 2016, brand: 'Audi'}
    };

    let newState = reducer(successAction, brandState);

    expect(newState).to.deep.equal({
      options: null,
      vehicles: [],
      error: null,
      extras: [],
      colors: []
      selectedBrand: 'Audi',
      selectedModel: {name: 'A1', year: 2016, brand: 'Audi'},
      photoUrl: null
    });
  });

  it('should return extras if action type is ' + FETCH_EXTRAS_SUCCESS, function () {
    let successAction = {
      type: FETCH_EXTRAS_SUCCESS,
      domain: CarModelDomain,
      photoUrl: 'thePhotoUrl',
      colors: {
        "name": "Color exterior",
        "options": [
          {
            "optionId": 1018,
            "optionName": "Llantas X",
            "categoryName": "Non Coded Item",
            "optionTypeName": "Option",
            "price": 375,
            "displayPrice": "375€"
          },
          {
            "optionId": 1050,
            "optionName": "Llantas Z",
            "categoryName": "Non Coded Item",
            "optionTypeName": "Option",
            "price": 375,
            "displayPrice": "375€"
          }
        ]
      },
      extras: [
        {
          "name": "Asientos",
          "options": [
            {
              "optionId": 1018,
              "optionName": "Asientos X",
              "categoryName": "Non Coded Item",
              "optionTypeName": "Option",
              "price": 375,
              "displayPrice": "375€"
            },
            {
              "optionId": 1050,
              "optionName": "Asientos Z",
              "categoryName": "Non Coded Item",
              "optionTypeName": "Option",
              "price": 375,
              "displayPrice": "375€"
            }
          ]
        }
      ]
    };

    let newState = reducer(successAction);

    expect(newState).to.deep.equal({
        "colors": {
          "name": "Color exterior",
          "options": [
            {
              "categoryName": "Non Coded Item",
              "displayPrice": "375€",
              "optionId": 1018,
              "optionName": "Llantas X",
              "optionTypeName": "Option",
              "price": 375
            },
            {
              "categoryName": "Non Coded Item",
              "displayPrice": "375€",
              "optionId": 1050,
              "optionName": "Llantas Z",
              "optionTypeName": "Option",
              "price": 375
            }
          ]
        },
        "error": null,
        "extras": [
          {
            "name": "Asientos",
            "options": [
              {
                "categoryName": "Non Coded Item",
                "displayPrice": "375€",
                "optionId": 1018,
                "optionName": "Asientos X",
                "optionTypeName": "Option",
                "price": 375
              },
              {
                "categoryName": "Non Coded Item",
                "displayPrice": "375€",
                "optionId": 1050,
                "optionName": "Asientos Z",
                "optionTypeName": "Option",
                "price": 375
              }
            ]
          }
        ],
        "options": null,
        "photoUrl": "thePhotoUrl",
        "selectedBrand": {name: null},
        "selectedModel": {
          "name": null,
          "year": null
        },
        "vehicles": []
      }
    );
  });

  it('should restart extras and colors when action type is ' + FETCHING_ENGINE, function () {
    let initialState = {
      colors: [],
      extras: [
        {
          "name": "Asientos",
          "options": [
            {
              "optionId": 1018,
              "optionName": "Asientos X",
              "categoryName": "Non Coded Item",
              "optionTypeName": "Option",
              "price": 375,
              "displayPrice": "375€"
            },
            {
              "optionId": 1050,
              "optionName": "Asientos Z",
              "categoryName": "Non Coded Item",
              "optionTypeName": "Option",
              "price": 375,
              "displayPrice": "375€"
            }
          ]
        }]
    };

    let fetchingAction = {type: FETCHING_ENGINE, domain: CarModelDomain};

    let newState = reducer(fetchingAction, initialState);

    expect(newState).to.deep.equal({
      extras: [],
      colors: []
    });
  });
});
