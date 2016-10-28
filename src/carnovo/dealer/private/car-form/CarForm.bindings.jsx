import {fetchModels, fetchOptionsFromModel, fetchExtrasFromEngine, fetchPackagesFromEngine, saveCar} from 'services/Car.service';
import {CarModelDomain, FETCHING_ENGINE, FETCHING_PACKAGE, SELECT_BRAND, SELECT_MODEL} from './CarForm.reducer';

let selectBrand = brand => ({type: SELECT_BRAND, domain: CarModelDomain, brand});
let selectModel = model => ({type: SELECT_MODEL, domain: CarModelDomain, model});

export const CarFormStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    selectedBrand: state.carModel.selectedBrand,
    selectedModel: state.carModel.selectedModel,
    options: state.carModel.options,
    extras: state.carModel.extras,
    colors: state.carModel.colors,
    packages: state.carModel.packages,
    photoUrl: state.carModel.photoUrl,
    selectedEngine: state.carModel.selectedEngine,
    selectedPackage: state.carModel.selectedPackage,
    modelsFromSelectedBrand: () => {
      if(state.carModel.selectedBrand.name === null) return [];
      return state.cars.models[state.carModel.selectedBrand.name].models
    },
    vehicle: (fuel, trans, doors) => state.carModel.vehicles.filter(vehicle => {
        return vehicle.fuelTypeToDisplay == fuel && vehicle.transmission == trans && vehicle.numberOfDoorsToDisplay == doors
      }
    )
  }
};

export const CarFormDispatchToPropsBinding = (dispatch, ownProps) => ({
  selectBrand: brand => dispatch(selectBrand(brand)),
  selectModel: model => dispatch(selectModel(model)),
  fetchExtrasFromEngine: (token, engine, selectedPackage) => {
    dispatch({type: FETCHING_PACKAGE, domain: CarModelDomain, selectedPackage: selectedPackage});
    fetchExtrasFromEngine(token, engine.vehicleId, selectedPackage).then(dispatch)
  },
  fetchPackagesFromEngine: (token, engine) => {
    dispatch({type: FETCHING_ENGINE, domain: CarModelDomain, selectedEngine: engine});

    fetchPackagesFromEngine(token, engine.vehicleId).then((response)=>{
      if(response.packages.length === 0) {
        fetchExtrasFromEngine(token, engine.vehicleId).then(dispatch);
      }
      dispatch(response);
    })
  },
  fetchModel: (token, brand, model) => fetchOptionsFromModel(token, brand, model).then(dispatch)
});
