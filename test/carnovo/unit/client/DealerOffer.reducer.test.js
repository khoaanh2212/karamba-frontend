import DealerOfferReducer, {
  initialState, FETCH_DEALER_OFFER_DETAILS_SUCCESS, DealerOfferDetailsDomain
} from 'client/feature/showroom/offers/details/DealerOfferDetails.reducer';

describe('[unit] DealerOffer.reducer', function () {
  const reducer = (action, state = initialState) => DealerOfferReducer(state, action);

  it('should return initial state', function () {
    let defaultState = reducer({});

    expect(defaultState).to.deep.equal(initialState);
  });

  it('should return dealer profile when type is ' + FETCH_DEALER_OFFER_DETAILS_SUCCESS, function () {
    let successAction = {
      type: FETCH_DEALER_OFFER_DETAILS_SUCCESS,
      domain: DealerOfferDetailsDomain,
      reviews: {
        comments: {
          data: []
        }
      }
    };

    let nextState = reducer(successAction, {
      dealer: {
        profile: {
          "avatar": "http://2.bp.blogspot.com/-rscYau_uPsM/Tzr34Us2HMI/AAAAAAAAB0Q/gtjnks_Gpw4/s200/avatar.jpg",
          "background": "http://image.redbull.com/rbx00498/0001/2/600/445/inarticle_eaurouge_3231231.jpg",
          "name": "Tag Heuer BMW M Models",
          "address": "Weissbier Strasse 46\n Köln\n Deutschland",
          "zipCode": "08011",
          "vendorName": "Max Verstappen",
          "vendorRole": "Number One Driver",
          "email": "email3",
          "schedule": "Mon - Sun \n 9:00 AM - 6:00 PM",
          "phoneNumber": null,
          "firstUse": true,
          "latitude":41.437869,
          "longitude":2.196618,
          "generalConditions": [
            {"id": 1, "text": "CONDITION_1"},
            {"id": 3, "text": "CONDITION_3"}
          ]
        },
        reviews: {
          ratings: {
            "1": 10,
            "2": 5
          }
        }
      }
    });

    expect(nextState.dealer.profile.generalConditions).to.deep.equal([
      {"id": 1, "text": "CONDITION_1"},
      {"id": 3, "text": "CONDITION_3"}
    ]);
  });
});

