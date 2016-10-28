import reducerFactory from 'shared/utils/ReducerFactory';
import {forEach, map} from 'lodash';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';
export const SELECT_BRAND = 'SELECT_BRAND';
export const SELECT_MODEL = 'SELECT_MODEL';
export const FETCHING_ENGINE = 'FETCHING_ENGINE';
export const FETCHING_PACKAGE = 'FETCHING_PACKAGE';
export const FETCH_PACKS_SUCCESS = 'FETCH_PACKS_SUCCESS';
export const FETCH_PERFORMANCES_SUCCESS = 'FETCH_PERFORMANCES_SUCCESS';
export const FETCH_PERFORMANCES_ERROR = 'FETCH_PERFORMANCES_ERROR';
export const FETCH_PACKS_ERROR = 'FETCH_PACKS_ERROR';
export const FETCH_EXTRAS_SUCCESS = 'FETCH_EXTRAS_SUCCESS';
export const FETCH_EXTRAS_ERROR = 'FETCH_EXTRAS_ERROR';
export const EDIT_VEHICLE = 'EDIT_VEHICLE';
export const CarModelDomain = 'CarModelDomain';
export const initialState = {
    error: null,
    selectedBrand: {name: null},
    selectedModel: {name: null, year: null},
    options: null,
    extras: [],
    colors: [],
    packages: [],
    vehicles: [],
    photoUrl: null
};

export const onFetchVehiclesSuccess = (state, vehicles) => ({
    ...state,
    options: {doors: vehicles.doors, fuels: vehicles.fuels, trans: vehicles.trans},
    vehicles: vehicles.vehicles,
    error: null
});

export const onFetchVehiclesError = (state, error) => ({
    ...state,
    vehicles: null,
    error
});

export const onSelectBrand = (state, brand) => ({
    ...state,
    selectedModel: {name: null, year: null},
    options: null,
    extras: [],
    colors: [],
    selectedBrand: brand
});

export const onFetchExtrasSuccess = (state, extras, colors, photoUrl) => ({
    ...state,
    extras,
    colors,
    photoUrl
});

export const onFetchExtrasError = (state, error) => ({
    ...state,
    error: error
});

export const onFetchPackagesSuccess = (state, packages) => ({
    ...state,
    packages
});

export const onFetchPackagesError = (state, error) => ({
    ...state,
    error: error
});

export const onFetchPerformancesSuccess = (state, performances) => {
    let vehicles = [...state.vehicles];
    forEach(vehicles, (vehicle) => {
        forEach(performances, (performance) => {
            if (vehicle.vehicleId === performance.vehicleId) {
                vehicle.performance = performance;
            }
        })
    });
    return {
        ...state,
        vehicles: vehicles
    }
};

export const onFetchPerformancesError = (state, error) => ({
    ...state,
    error: error
});

export const onSelectModel = (state, model) => ({
    ...state,
    selectedModel: model,
    options: null,
    extras: [],
    colors: []
});

export const onFetchingPackage = (state, selectedPackage) => ({
    ...state,
    selectedPackage: selectedPackage,
    extras: [],
    colors: []
});

export const onFetchingEngine = (state, engine) => ({
    ...state,
    selectedEngine: engine,
    extras: [],
    colors: []
});

let cases = (state, action) => {
    switch (action.type) {
        case FETCH_VEHICLES_SUCCESS:
            return onFetchVehiclesSuccess(state, action.vehicles);
        case FETCH_VEHICLES_ERROR:
            return onFetchVehiclesError(state, action.error);
        case SELECT_BRAND:
            return onSelectBrand(state, action.brand);
        case SELECT_MODEL:
            return onSelectModel(state, action.model);
        case FETCH_PACKS_SUCCESS:
            return onFetchPackagesSuccess(state, action.packages);
        case FETCH_PACKS_ERROR:
            return onFetchPackagesError(state, action.error);
        case FETCH_PERFORMANCES_SUCCESS:
            return onFetchPerformancesSuccess(state, action.performances);
        case FETCH_PERFORMANCES_ERROR:
            return onFetchPerformancesError(state, action.error);
        case FETCH_EXTRAS_SUCCESS:
            return onFetchExtrasSuccess(state, action.extras, action.colors, action.photoUrl);
        case FETCH_EXTRAS_ERROR:
            return onFetchExtrasError(state, action.error);
        case FETCHING_ENGINE:
            return onFetchingEngine(state, action.selectedEngine);
        case FETCHING_PACKAGE:
            return onFetchingPackage(state, action.selectedPackage);
    }
};

export default reducerFactory(initialState, CarModelDomain, cases);
