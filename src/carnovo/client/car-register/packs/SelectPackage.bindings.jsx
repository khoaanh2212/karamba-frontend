import { CarRegisterDomain, FETCH_PACKS_SUCCESS, VEHICLE_HAS_PACKAGE, SELECT_PACKAGE } from '../RegisterCar.reducer';
import { fetchPackagesFromEngine } from 'services/Car.service';
import { browserHistory } from 'react-router'
import map from 'lodash/map';

let selectPackage = packageId => ({type: SELECT_PACKAGE, domain: CarRegisterDomain, packageId});
let setVehicleHasPackages = hasPackages => ({type: VEHICLE_HAS_PACKAGE, domain: CarRegisterDomain, hasPackages});

export function SelectPackagePropsBinding(state){
  return {
    packages: map(state.carModel.packages, function(pack) {
      pack.hasReadmore = pack.extrasIncluded.length > 3;
      return pack;
    })
  }
}

export const SelectPackageDispatchBinding = (dispatch, ownProps) => {
  return {
    fetchPackagesFromEngine: (token, vehicleId) => fetchPackagesFromEngine(token, vehicleId)
      .then(dispatch)
      .then((result) => {
          if (result.type ===  FETCH_PACKS_SUCCESS) {
            dispatch(setVehicleHasPackages(result.packages.length > 0));
            if (result.packages.length === 0) {
              browserHistory.push(process.env.PUBLIC_PATH + 'car-register/select-color/' + ownProps.params.vehicleId);
            }
          }
      }),
    selectPackage: (packageId) => dispatch(selectPackage(packageId))
  }
};
