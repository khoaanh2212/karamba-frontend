import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions, postOptions} from './Utils';
import {
    CarsDomain,
    FETCH_BRANDS_ERROR,
    FETCH_BRANDS_SUCCESS,
    FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR
} from "hoc/cars.reducer";

import {
    CarModelDomain,
    FETCH_VEHICLES_ERROR,
    FETCH_VEHICLES_SUCCESS,
    FETCH_EXTRAS_SUCCESS,
    FETCH_EXTRAS_ERROR,
    FETCH_PACKS_SUCCESS,
    FETCH_PACKS_ERROR,
    FETCH_PERFORMANCES_SUCCESS,
    FETCH_PERFORMANCES_ERROR
} from "dealer/private/car-form/CarForm.reducer";

import {
    CatalogDomain,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_SUCCESS,
    SAVE_CATALOG_SUCCESS,
    SAVE_CATALOG_ERROR
} from "dealer/private/catalog/Catalog.reducer";

import {
    StockCatalogDomain,
    FETCH_STOCK_ERROR,
    FETCH_STOCK_SUCCESS,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_ERROR
} from "dealer/private/stock/StockCatalog.reducer";

function fetchBrandsSuccess(response) {
    return {
        type: FETCH_BRANDS_SUCCESS,
        domain: CarsDomain,
        brands: response.data
    };
}

function fetchBrandsError(error) {
    return {
        type: FETCH_BRANDS_ERROR,
        domain: CarsDomain,
        error: error
    };
}

function fetchModelsSuccess(brand, response) {
    return {
        type: FETCH_MODELS_SUCCESS,
        domain: CarsDomain,
        brand: brand,
        models: markDuplicateModels(response.data)
    };
}

function fetchModelsError(brand, error) {
    return {
        type: FETCH_MODELS_ERROR,
        brand: brand,
        error: error
    };
}

function fetchModelSuccess(vehicles) {
    return {
        type: FETCH_VEHICLES_SUCCESS,
        domain: CarModelDomain,
        vehicles: vehicles.data
    }
}

function fetchCatalogSuccess(response) {
    return {
        type: FETCH_CATALOG_SUCCESS,
        domain: CatalogDomain,
        catalog: markDuplicateModelsInBranArray(response.data)
    }
}

function fetchStockSuccess(response) {
    return {
        type: FETCH_STOCK_SUCCESS,
        domain: StockCatalogDomain,
        stock: response.data.stock
    }
}

function fetchCatalogError(error) {
    return {
        type: FETCH_CATALOG_ERROR,
        domain: CatalogDomain,
        error: error
    }
}

function fetchStockError(error) {
    return {
        type: FETCH_STOCK_ERROR,
        domain: StockCatalogDomain,
        error: error
    }
}

function saveCatalogSuccess(response) {
    return {
        type: SAVE_CATALOG_SUCCESS,
        domain: CatalogDomain,
        catalog: response.data
    }
}

function saveCatalogError(error) {
    return {
        type: SAVE_CATALOG_ERROR,
        domain: CatalogDomain,
        error: error
    }
}

function fetchModelError(error) {
    return {
        type: FETCH_VEHICLES_ERROR,
        domain: CarModelDomain,
        error: error
    }
}

function fetchPackagesSuccess(packages) {
  return {
    type: FETCH_PACKS_SUCCESS,
    domain: CarModelDomain,
    packages: packages.data
  }
}

function fetchPackagesError(error) {
  return {
    type: FETCH_PACKS_ERROR,
    error: error
  }
}

function fetchPerformancesSuccess(performances) {
  return {
    type: FETCH_PERFORMANCES_SUCCESS,
    domain: CarModelDomain,
    performances: performances.data
  }
}

function fetchPerformancesError(error) {
  return {
    type: FETCH_PERFORMANCES_ERROR,
    error: error
  }
}

let markDuplicateModelsInBranArray = (brandArray)=> {
    for (var k in brandArray) {
        if (brandArray.hasOwnProperty(k)) {
            markDuplicateModels(brandArray[k]);
        }
    }
    for (var i = 0; i < brandArray.length; i++) {
        markDuplicateModels(brandArray[i]);
    }
    return brandArray
};

let markDuplicateModels = (modelArray) => {
    for (var i = 0; i < modelArray.length; i++) {
        var tested = modelArray[i];
        for (var k = 0; k < modelArray.length; k++) {
            if (tested.name === modelArray[k].name && tested.year !== modelArray[k].year) {
                modelArray[k].duplicated = true;
                modelArray[i].duplicated = true;
            }
        }
    }
    return modelArray;
};

let fetchExtrasSuccess = response => {
    let extras = response.data.extras;
    let colors = response.data.colors;
    let photoUrl = response.data.photoUrl;
    return {
        type: FETCH_EXTRAS_SUCCESS,
        domain: CarModelDomain,
        extras,
        colors,
        photoUrl
    }
};

let fetchExtrasError = error => ({
    type: FETCH_EXTRAS_ERROR,
    domain: CarModelDomain,
    error: error
});

let saveCarSuccess = listCars => ({
    type: 'SAVE_CAR_SUCCES',
    stock: listCars.data.stock
});

let saveCarError = error => ({
    type: 'SAVE_CAR_ERROR',
    error
});

let deleteCarSuccess = carId => ({
    type: DELETE_CAR_SUCCESS,
    domain: StockCatalogDomain,
    carId
});

let deleteCarError = error => ({
    type: DELETE_CAR_ERROR,
    domain: StockCatalogDomain,
    error
});

export function fetchBrands(token) {
    var url = config.api + '/car/brands';
    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchBrandsSuccess, fetchBrandsError));
}

export function fetchModels(token, brand) {
    var url = config.api + '/car/brands/' + brand + "/models";
    let success = (response) => fetchModelsSuccess(brand, response);
    let error = (response) => fetchModelsError(brand, response);

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, success, error));
}

export function fetchOptionsFromModel(token, brand, model) {
    var url = config.api + '/car/brands/' + brand + "/models/" + model;

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchModelSuccess, fetchModelError));
}

export function fetchCatalog(token) {
    var url = config.api + '/dealer/cars';

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchCatalogSuccess, fetchCatalogError));
}

export function fetchStock(token) {
    var url = config.api + '/dealer/stock';

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchStockSuccess, fetchStockError));
}

export function saveCatalog(catalog, token) {
    return fetch(config.api + '/dealer/cars', postOptions(catalog, token))
        .then(data => checkStatus(data, saveCatalogSuccess, saveCatalogError));
}

export function fetchExtrasFromEngine(token, engine, packageId) {
    var extrasUrl = config.api + '/car/vehicle/' + engine;
    if(packageId !== undefined) {
        extrasUrl += "/" + packageId
    }
    return fetch(extrasUrl, getOptions(token))
        .then(data => checkStatus(data, fetchExtrasSuccess, fetchExtrasError))
}

export function fetchPackagesFromEngine(token, engine) {
    return fetch(config.api + '/car/packs/' + engine, getOptions(token))
        .then(data => checkStatus(data, fetchPackagesSuccess, fetchPackagesError))
}

export function fetchPerformancesFromEngines(token, engines) {
  let options = {
    method: 'POST',
    headers: {
      'X-TOKEN': token
    },
    body: JSON.stringify(engines)
  };
  return fetch(config.api + '/car/performances', options)
      .then(data => checkStatus(data, fetchPerformancesSuccess, fetchPerformancesError))
}

export function saveCar(token, car) {
    return fetch(config.api + '/dealer/stock', postOptions(car, token))
        .then(data => checkStatus(data, saveCarSuccess, saveCarError))
}

export function updateCar(token, car) {
    return fetch(config.api + '/dealer/stock', postOptions(car, token, 'PUT'))
        .then(data => checkStatus(data, saveCarSuccess, saveCarError))
}

export function deleteCar(token, carId) {
    let deleteSuccess = () => deleteCarSuccess(carId);
    return fetch(config.api + '/dealer/stock/' + carId, getOptions(token, 'DELETE'))
        .then(data => checkStatus(data, deleteSuccess, deleteCarError))
}
