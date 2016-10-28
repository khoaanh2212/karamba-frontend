import {fetchPendingDealerFromToken} from 'services/ValidateDealer.service';
import {
    FETCH_DEALER_CONFIRM_SUCCESS,
    FETCH_DEALER_CONFIRM_ERROR
} from 'confirm/dealer/ValidateDealer.reducer.jsx';

describe("[integration] DealerConfirm.service", () => {
    it("should return an action type " + FETCH_DEALER_CONFIRM_SUCCESS, () => {
        let validToken = 'someTokenNotEqualTofalse-token';

        return expect(fetchPendingDealerFromToken(validToken)).to.eventually.have.property('type', FETCH_DEALER_CONFIRM_SUCCESS);
    });

    it("should return an action type " + FETCH_DEALER_CONFIRM_ERROR, () => {
        let invalidToken = 'false-token';

        return expect(fetchPendingDealerFromToken(invalidToken)).to.eventually.have.property('type', FETCH_DEALER_CONFIRM_ERROR);
    });
});
