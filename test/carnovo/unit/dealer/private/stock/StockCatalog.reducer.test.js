import StockCatalogReducer, {
  initialState, FETCH_STOCK_SUCCESS, FETCH_STOCK_ERROR, UNSET_NEW, DELETE_CAR_SUCCESS, StockCatalogDomain
} from 'dealer/private/stock/StockCatalog.reducer';

describe('[unit] StockCatalog.reducer', function () {
  const reducer = (action, state = initialState) => StockCatalogReducer(state, action);

  it('should return initial state', function () {
    let defaultState = reducer({});

    expect(defaultState).to.deep.equal(initialState);
  });

  it('should return array of stock cars ' + FETCH_STOCK_SUCCESS, function () {
    let successAction = {
      type: FETCH_STOCK_SUCCESS,
      domain: StockCatalogDomain,
      stock: [
        {
          "id": 1245,
          "vehicle": {
            "vehicleId": 123,
            "makeNameToDisplay": "BMW",
            "modelNameToDisplay": "1 Series",
            "modelYearToDisplay": 2016,
            "fuelTypeToDisplay": "Diesel",
            "transmission": "Auto",
            "numberOfDoorsToDisplay": 5,
            "derivativeToDisplay": "TDI 1.9 Sport"
          },
          "color": {
            "optionId": 6845,
            "optionName": "White"
          },
          "extras": [
            {
              "optionId": 654,
              "optionName": "Parktronic"
            },
            {
              "optionId": 687,
              "optionName": "Avantgard"
            },
            {
              "optionId": 1328,
              "optionName": "GPS"
            }
          ],
          "price": {
            "PVP": "48.300€",
            "price": "45.000€",
            "discount": "10"
          }
        }
      ]
    };
    let newState = reducer(successAction);
    expect(newState.stock.length).to.equal(1);
  });

  it('should set error when action type is  ' + FETCH_STOCK_ERROR, function () {
    let testError = 'test';
    let successAction = {
      type: FETCH_STOCK_ERROR,
      domain: StockCatalogDomain,
      error: testError
    };
    let newState = reducer(successAction);
    expect(newState.error).to.equal(testError);
  });

  it('should unset new car when action type is ' + UNSET_NEW, function () {
    let successAction = {
      type: UNSET_NEW,
      domain: StockCatalogDomain
    };
    let newState = reducer(successAction, {
      stock: [
        {
          "isNew": true,
          "id": 1245,
          "vehicle": {
            "vehicleId": 123,
            "makeNameToDisplay": "BMW",
            "modelNameToDisplay": "1 Series",
            "modelYearToDisplay": 2016,
            "fuelTypeToDisplay": "Diesel",
            "transmission": "Auto",
            "numberOfDoorsToDisplay": 5,
            "derivativeToDisplay": "TDI 1.9 Sport"
          },
          "color": {
            "optionId": 6845,
            "optionName": "White"
          },
          "extras": [
            {
              "optionId": 654,
              "optionName": "Parktronic"
            },
            {
              "optionId": 687,
              "optionName": "Avantgard"
            },
            {
              "optionId": 1328,
              "optionName": "GPS"
            }
          ],
          "price": {
            "PVP": "48.300€",
            "price": "45.000€",
            "discount": "10"
          }
        }
      ]
    });
    expect(newState.stock[0].isNew).to.equal(null);
  });

  it('should return array of stock cars without the deleted car on ' + DELETE_CAR_SUCCESS, function () {
    let initial = {
      loaded: false,
      loading: true,
      error: null,
      stock: [{id: 1}, {id: 2}, {id: 3}]
    };

    let deleteAction = {
      type: DELETE_CAR_SUCCESS,
      domain: StockCatalogDomain,
      carId: 2
    };

    let nextState = reducer(deleteAction, initial);

    expect(nextState.stock).to.deep.equal([
      {id: 1}, {id: 3}
    ])
  });
});
