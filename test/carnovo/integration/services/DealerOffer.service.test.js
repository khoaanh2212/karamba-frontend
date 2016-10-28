import {fetchDealerOfferDetails} from 'services/DealerOffer.service';
import {FETCH_DEALER_OFFER_DETAILS_SUCCESS} from "client/feature/showroom/offers/details/DealerOfferDetails.reducer";

describe("[integration] DealerOffer.service", () => {
  it("should return an action type " + FETCH_DEALER_OFFER_DETAILS_SUCCESS, () => {
    return expect(fetchDealerOfferDetails({})).to.eventually.have.property('type', FETCH_DEALER_OFFER_DETAILS_SUCCESS);
  });
});
