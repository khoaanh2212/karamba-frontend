import {CarRegisterDomain, REGISTER_POST_CODE, REGISTER_EMAIL} from '../RegisterCar.reducer';
import {clientCreate} from 'services/Client.service';

let registerPostcode = (postcode) => ({ type: REGISTER_POST_CODE, domain: CarRegisterDomain, postcode });
let registerEmail = (email) => ({ type: REGISTER_EMAIL, domain: CarRegisterDomain, email });

export function ClientRegisterPropsBinding(state) {
    let extras = state.carRegister.selectedExtras;
    return {
        postcode: state.carRegister.postcode,
        email: state.carRegister.email,
        carAppliance: {
            vehicleId: state.carRegister.vehicleId,
            brand: state.carRegister.brand,
            model: state.carRegister.model,
            selectedDerivative: state.carRegister.selectedDerivatives,
            selectedExtra: {
                extras: extras.extras,
                color: extras.color
            },
            selectedPackage: state.carRegister.packageId
        }
    }
}

export function ClientRegisterDispatchBinding(dispatch) {
  return {
    toast: notification => dispatch(notification),
    registerPostCode: (postcode) => dispatch(registerPostcode(postcode)),
    registerEmail: (email) => dispatch(registerEmail(email)),
    registerClient: (name, email, postCode, password, carAppliance) => clientCreate(name, email, postCode, password, carAppliance).then(dispatch)
  }
}
