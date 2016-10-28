import {fetchModels, fetchOptionsFromModel, fetchExtrasFromEngine, updateCar} from 'services/Car.service';
import {CarModelDomain, EDIT_VEHICLE, SELECT_BRAND, SELECT_MODEL} from 'dealer/private/car-form/CarForm.reducer';

let selectBrand = brand => ({type: SELECT_BRAND, domain: CarModelDomain, brand});
let selectModel = model => ({type: SELECT_MODEL, domain: CarModelDomain, model});

export const EditCarStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    loaded: state.carModel.selectedBrand !== null && state.carModel.vehicles.length > 0,
    vehicle: state.stock.stock.filter(vehicle => vehicle.id === ownProps.params.vehicleId)[0]
  }
};

export const EditCarDispatchToPropsBinding = (dispatch, ownProps) => ({
  selectBrand: brand => dispatch(selectBrand(brand)),
  selectModel: model => dispatch(selectModel(model)),
  updateCar: car => updateCar(ownProps.token, car).then(dispatch)
});
