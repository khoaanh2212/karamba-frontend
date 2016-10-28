import reducerFactory from 'shared/utils/ReducerFactory';

export const SELECT_DERIVATIVE = 'SELECT_DERIVATIVE';
export const RESET_SELECTED_DERIVATIVE = 'RESET_SELECTED_DERIVATIVE';
export const READ_MORE_PACKAGE = 'READ_MORE_PACKAGE';
export const SELECT_VEHICLE = 'SELECT_VEHICLE';
export const SELECT_PACKAGE = 'SELECT_PACKAGE';
export const VEHICLE_HAS_PACKAGE = 'VEHICLE_HAS_PACKAGE';
export const SELECT_EXTRAS = 'SELECT_EXTRAS';
export const SELECT_COLOR = 'SELECT_COLOR';
export const SELECT_BRAND = 'SELECT_BRAND';
export const SELECT_MODEL = 'SELECT_MODEL';
export const REGISTER_POST_CODE = 'REGISTER_POST_CODE';
export const REGISTER_EMAIL = 'REGISTER_EMAIL';
export const REGISTER_RELOAD_EXTRAS = 'REGISTER_RELOAD_EXTRAS';
export const RESET_REGISTER_RELOAD_EXTRAS = 'RESET_REGISTER_RELOAD_EXTRAS';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const FETCH_PACKS_SUCCESS = 'FETCH_PACKS_SUCCESS';
export const CarRegisterDomain = 'CarRegisterDomain';
const initialExtras = {
    extras: [],
    color: null
};
export const initialState = {
    error: null,
    hasPackages: false,
    selectedDerivatives: {
        fuels: [],
        trans: [],
        doors: []
    },
    selectedExtras: {
      extras: [],
      color: null
    },
    brand: null,
    model: null,
    vehicleId: null,
    packageId: null,
    email: null,
    postcode: null
};

const getDerivativesByType = (selectedDerivatives, derivativeType) => {
    switch (derivativeType) {
        case "fuels":
            return selectedDerivatives.fuels;
        case "trans":
            return selectedDerivatives.trans;
        case "doors":
            return selectedDerivatives.doors;
    }
};

const setDerivativesByType = (selectedDerivatives, derivativeType, newDerivatives) => {
    switch (derivativeType) {
        case "fuels":
            selectedDerivatives.fuels = newDerivatives;
            break;
        case "trans":
            selectedDerivatives.trans = newDerivatives;
            break;
        case "doors":
            selectedDerivatives.doors = newDerivatives;
            break;
    }
};

const manipulateSelectedDerivatives = (state, derivative, derivativeType) => {
    let selectedDerivatives = {...state.selectedDerivatives};
    let derivatives = getDerivativesByType(selectedDerivatives, derivativeType);
    let index = derivatives.indexOf(derivative);
    if (index > -1) {
        derivatives = derivatives.filter(e => e !== derivative);
    } else {
        derivatives.push(derivative);
    }
    setDerivativesByType(selectedDerivatives, derivativeType, derivatives);
    return selectedDerivatives;
};

let handleSelectedExtras = (state, optionId) => {
    let selectedExtras = {...state.selectedExtras};
    if (!selectedExtras) {
        selectedExtras = initialExtras;
    }
    if (selectedExtras.extras.indexOf(optionId) >= 0) {
        selectedExtras.extras = _.filter(selectedExtras.extras, extra => extra != optionId);
    } else {
        selectedExtras.extras.push(optionId);
    }
    return {...state, selectedExtras: selectedExtras}
};

let handleSelectedColor = (state, optionId) => {
    let selectedExtras = {...state.selectedExtras};
    selectedExtras.color = optionId;
    return {...state, selectedExtras: selectedExtras};
};

let handleSelectedBrand = (state, brandName) => {
    return {...state, brand: brandName, model: null}
};

let handleSelectedModel = (state, modelName) => {
    return {...state, model: modelName}
};

let onSelectDerivative = (state, derivative, derivativeType) => ({
    ...state,
    selectedDerivatives: manipulateSelectedDerivatives(state, derivative, derivativeType)
});

let onResetSelectedDerivative = (state) => ({
    ...state,
    selectedDerivatives: {
        fuels: [],
        trans: [],
        doors: []
    }
});

let onSetVehicleHasPackage = (state, value) => {
    return {...state, hasPackages: value};
};

let onReadMore = (state, item) => {
    item.hasReadmore = !item.hasReadmore;
    return {...state, item};
};

let onSelectVehicle = (state, vehicleId) => {
    return {...state, vehicleId: vehicleId};
};

let onSelectPackage = (state, packageId) => {
    return {...state, packageId: packageId};
};

let registerEmail = (state, email) => {
    return {...state, email: email};
};

let registerPostCode = (state, postcode) => {
    return {...state, postcode: postcode};
};

let onClearSession = (state) => {
    return {
        ...state,
        error: null,
        hasPackages: false,
        selectedDerivatives: {
          fuels: [],
          trans: [],
          doors: []
        },
        selectedExtras: {
          extras: [],
          color: null
        },
        brand: null,
        model: null,
        vehicleId: null,
        packageId: null,
        email: null,
        postcode: null,
        reload: false
    };
};

let cases = (state, action) => {
    switch (action.type) {
        case SELECT_DERIVATIVE:
            return onSelectDerivative(state, action.derivative, action.derivativeType);
        case RESET_SELECTED_DERIVATIVE:
            return onResetSelectedDerivative(state);
        case VEHICLE_HAS_PACKAGE:
            return onSetVehicleHasPackage(state, action.hasPackages);
        case SELECT_VEHICLE:
          return onSelectVehicle(state, action.vehicleId);
        case READ_MORE_PACKAGE:
            return onReadMore(state, action.item);
        case SELECT_PACKAGE:
          return onSelectPackage(state, action.packageId);
        case SELECT_EXTRAS:
            return handleSelectedExtras(state, action.optionId);
        case SELECT_COLOR:
            return handleSelectedColor(state, action.optionId);
        case SELECT_BRAND:
            return handleSelectedBrand(state, action.brandName);
        case SELECT_MODEL:
            return handleSelectedModel(state, action.modelName);
        case REGISTER_POST_CODE:
            return registerPostCode(state, action.postcode);
        case REGISTER_EMAIL:
            return registerEmail(state, action.email);
        case CLEAR_SESSION:
            return onClearSession(state);
        case REGISTER_RELOAD_EXTRAS:
            return {...state, reload: true};
        case RESET_REGISTER_RELOAD_EXTRAS:
            return {...state, reload: false};
    }
}

export default reducerFactory(initialState, CarRegisterDomain, cases);
