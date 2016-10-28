import {fetchExtrasFromEngine} from 'services/Car.service';
import {createAppliance} from 'services/Client.service';
import {CarRegisterDomain, SELECT_EXTRAS, SELECT_COLOR, RESET_REGISTER_RELOAD_EXTRAS} from '../RegisterCar.reducer';

let selectExtras = (optionId) =>({ type: SELECT_EXTRAS, domain: CarRegisterDomain, optionId });
let selectColor = (optionId) => ({ type: SELECT_COLOR, domain: CarRegisterDomain, optionId });
let resetReloadExtras = () =>({ type: RESET_REGISTER_RELOAD_EXTRAS, domain: CarRegisterDomain });

export function SelectColorPropsBinding(state, ownProps) {
  return {
    hasPackages: state.carRegister.hasPackages,
    reload: state.carRegister.reload,
    token: state.auth.token,
    isLogged: state.auth.token ? true : false,
    colors: state.carModel.colors,
    extras: state.carModel.extras,
    carAppliance: {
      vehicleId: state.carRegister.vehicleId,
      brand: state.carRegister.brand,
      model: state.carRegister.model,
      selectedDerivative: state.carRegister.selectedDerivatives,
      selectedExtra: state.carRegister.selectedExtras,
      selectedPackage: state.carRegister.packageId
    }
  }
}

export function SelectColorDispatchBinding(dispatch) {
  return {
    fetchExtras: (token, vehicleId, packageId) => fetchExtrasFromEngine(token, vehicleId, packageId).then(dispatch),
    selectExtras: (optionId) => dispatch(selectExtras(optionId)),
    selectColor: (optionId) => dispatch(selectColor(optionId)),
    resetReloadExtras: () => dispatch(resetReloadExtras()),
    createAppliance: (token, carAppliance) => createAppliance(token, carAppliance).then(dispatch)
  }
}

