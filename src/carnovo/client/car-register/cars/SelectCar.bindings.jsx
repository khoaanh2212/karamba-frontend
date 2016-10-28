import {fetchStock, fetchOptionsFromModel, fetchPerformancesFromEngines} from 'services/Car.service';
import {CarRegisterDomain, SELECT_VEHICLE, SELECT_DERIVATIVE} from '../RegisterCar.reducer';

import {map} from 'lodash';

let selectDerivative = (derivative, derivativeType) => ({
    type: SELECT_DERIVATIVE,
    domain: CarRegisterDomain,
    derivative,
    derivativeType
});

let selectVehicle = vehicleId => ({type: SELECT_VEHICLE, domain: CarRegisterDomain, vehicleId});

export function SelectCarPropsBinding(state) {
    return {
        token: state.auth.token,
        options: state.carModel.options,
        vehicles: state.carModel.vehicles,
        selectedDerivatives: state.carRegister.selectedDerivatives
    }
}

export function SelectCarDispatchBinding(dispatch) {
    return {
        getVehicles: (token, brand, model) => {
            fetchOptionsFromModel(token, brand, model).then(dispatch)
        },
        selectVehicle: (vehicleId) => dispatch(selectVehicle(vehicleId)),
        selectDerivative: (derivative, derivativeType) => dispatch(selectDerivative(derivative, derivativeType))
    }
}
