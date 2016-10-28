import {fetchCurrentDealer} from 'services/Dealer.service';
import {FETCH_DEALER_SUCCESS, FETCH_DEALER_ERROR} from "dealer/private/edit/DealerEditForm.uistate";

describe("[integration] Dealer.service", () => {
  it("should return an action type " + FETCH_DEALER_SUCCESS, () => {
    let validToken = 'valid-token';
    return expect(fetchCurrentDealer(validToken)).to.eventually.have.property('type', FETCH_DEALER_SUCCESS);
  });

  it("should return an action type " + FETCH_DEALER_ERROR, () => {
    let invalidToken = 'false-token';
    return expect(fetchCurrentDealer(invalidToken)).to.eventually.have.property('type', FETCH_DEALER_ERROR);
  });
});
