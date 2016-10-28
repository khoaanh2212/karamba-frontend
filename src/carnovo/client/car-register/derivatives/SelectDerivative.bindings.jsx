import {fetchOptionsFromModel} from 'services/Car.service';
import {CarRegisterDomain, SELECT_DERIVATIVE} from '../RegisterCar.reducer';

let selectDerivative = (derivative, derivativeType) => ({type: SELECT_DERIVATIVE, domain: CarRegisterDomain, derivative, derivativeType});

export const SelectDerivativePropsBinding = (state, ownProps) => {
  return {
    options: state.carModel.options,
    selectedDerivatives: state.carRegister.selectedDerivatives
  }
};

export const SelectDerivativeDispatchBinding = (dispatch, ownProps) => {
  return {
    fetchModel: (token, brand, model) => fetchOptionsFromModel(token, brand, model).then(dispatch),
    selectDerivative: (derivative, derivativeType) =>  dispatch(selectDerivative(derivative, derivativeType))
  }
};
