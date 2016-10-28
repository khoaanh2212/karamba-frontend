import {register} from "services/pendingDealers.service";
import {fetchBrands, fetchModels} from "services/Car.service";
import {
    CarRegisterDomain,
    RESET_SELECTED_DERIVATIVE,
    SELECT_BRAND,
    SELECT_MODEL
} from './car-register/RegisterCar.reducer';

let selectBrand = (brandName) => ({type: SELECT_BRAND, domain: CarRegisterDomain, brandName});
let selectModel = (modelName) => ({type: SELECT_MODEL, domain: CarRegisterDomain, modelName});

export function ClientHomePropsBindings(state, ownProps) {
    return {
        brands: state.cars.brands,
        models: state.cars.models,
        selectedBrand: state.carRegister.brand,
        selectedModel: state.carRegister.model
    }
}

export function ClientHomeDispatchBindings(dispatch, ownProps) {
    return {
        fetchBrands: (token) => fetchBrands(token).then(dispatch),
        fetchModels: (token, brand) => fetchModels(token, brand).then(dispatch),
        resetSelectedDerivative: () => dispatch({type: RESET_SELECTED_DERIVATIVE, domain: CarRegisterDomain}),
        selectBrand: (brandName) => dispatch(selectBrand(brandName)),
        selectModel: (modelName) => dispatch(selectModel(modelName))
    }
}
