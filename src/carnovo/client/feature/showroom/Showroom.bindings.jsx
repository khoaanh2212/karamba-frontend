import {fetchAppliances, deleteAppliance} from 'services/Client.service';
import {fetchConversationListOfClient} from 'services/Conversations.service';
import {push} from 'react-router-redux';
import {CLEAR_SESSION} from '../../../auth/Login.reducer';
import {CarRegisterDomain} from '../../../client/car-register/RegisterCar.reducer';

let clearSession = () => ({type: CLEAR_SESSION, domain: CarRegisterDomain});

export function ShowroomPropsBinding(state) {
    return {
        token: state.auth.token,
        appliances: state.client.appliances,
        conversations: state.conversations.conversationsClient
    }
}

export const ShowroomDispatchBinding = (dispatch, ownProps) => {
    return {
        fetchAppliances: (token) => fetchAppliances(token).then(dispatch),
        deleteAppliance: (token, applianceId) => deleteAppliance(token, applianceId).then(dispatch),
        fetchConversationListOfClient: (token) => fetchConversationListOfClient(token).then(dispatch),
        clearSession: () => dispatch(clearSession())
    }
};
