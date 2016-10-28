import {fetchModels, fetchOptionsFromModel, fetchExtrasFromEngine, saveCar} from 'services/Car.service';
import {CarModelDomain, EDIT_VEHICLE, SELECT_BRAND, SELECT_MODEL} from 'dealer/private/car-form/CarForm.reducer';
import {
    STOCK_FINISH_UPDATE_NOTIFICATION_ON,
    NotificationStatusDomain
} from '../../../notification/Notification.reducer';

let finishUpdateStock = (status) => ({
    type: STOCK_FINISH_UPDATE_NOTIFICATION_ON,
    domain: NotificationStatusDomain,
    status
});

let status = true;

export const AddCarDispatchToPropsBinding = (dispatch, ownProps) => ({
    addCar: data => saveCar(ownProps.token, data).then(dispatch).then(()=> {
        dispatch(finishUpdateStock(status));
    })
});
