import {go} from 'react-router-redux';
import {SEND_CLIENTMESSAGE_SUCCESS} from 'client/feature/message/ClientMessage.reducer';
import {SEND_DEALER_MESSAGE_SUCCESS} from 'dealer/private/message/DealerMessage.reducer';

export default store => next => action => {
    let nextAction = next(action);
    switch (action.type) {
        case SEND_CLIENTMESSAGE_SUCCESS:
            store.dispatch(go('/client/message/'+action.id));
            break;
        case SEND_DEALER_MESSAGE_SUCCESS:
            store.dispatch(go('/dealer/message/'+action.id));
            break;
    }
    return nextAction;
}