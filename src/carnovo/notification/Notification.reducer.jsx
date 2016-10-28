/**
 * Created by ka on 10/10/2016.
 */
import reducerFactory from '../shared/utils/ReducerFactory';

export const DEALER_FINISH_UPDATE_NOTIFICATION_ON = 'DEALER_FINISH_UPDATE_NOTIFICATION_ON';
export const DEALER_FINISH_UPDATE_NOTIFICATION_OFF = 'DEALER_FINISH_UPDATE_NOTIFICATION_OFF';
export const STOCK_FINISH_UPDATE_NOTIFICATION_ON = 'STOCK_FINISH_UPDATE_NOTIFICATION_ON';
export const STOCK_FINISH_UPDATE_NOTIFICATION_OFF = 'STOCK_FINISH_UPDATE_NOTIFICATION_OFF';

export const NotificationStatusDomain = 'NotificationStatusDomain';
export const initialState = {
    justUpdatedDealer: false,
    justUpdateStock: false
};

let cases = (state, action) => {
    switch (action.type) {
        case DEALER_FINISH_UPDATE_NOTIFICATION_ON:
            return {...state, justUpdatedDealer: action.status}
        case DEALER_FINISH_UPDATE_NOTIFICATION_OFF:
            return {...state, justUpdatedDealer: action.status}
        case STOCK_FINISH_UPDATE_NOTIFICATION_ON:
            return {...state, justUpdateStock: action.status}
        case STOCK_FINISH_UPDATE_NOTIFICATION_OFF:
            return {...state, justUpdateStock: action.status}
    }
};

export default reducerFactory(initialState, NotificationStatusDomain, cases);
