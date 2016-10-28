import {push} from 'react-router-redux';
import { MAKE_OFFER_SUCCESS } from "../dealer/private/opportunities/Opportunities.reducer";

export default store => next => action => {
  let nextAction = next(action);

  switch (action.type) {
    case MAKE_OFFER_SUCCESS:
      store.dispatch(push('/dealer/opportunities'));
      break;
  }

  return nextAction;
}

