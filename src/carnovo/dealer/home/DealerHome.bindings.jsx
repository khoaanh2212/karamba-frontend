import {register} from "services/pendingDealers.service";

export function DealerHomeDispatchBindings(dispatch) {
    return {
        onDealerRegistration: pendingDealerApplication => {
            register(pendingDealerApplication)
                .then(dispatch);
        }
    }
}
