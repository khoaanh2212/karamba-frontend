import {dealerLogin} from 'services/DealerLogin.service';

describe("[integration] [Dealer] Login.service", () => {
  it("should return an action type AUTH_SUCCESS when valid user is logging in", () => {
    return expect(dealerLogin("user", "password")).to.eventually.have.property('type', 'AUTH_SUCCESS');
  });

  it("should return an action type AUTH_ERROR when invalid user is provided", () => {
    return expect(dealerLogin("fake", "fake")).to.eventually.have.property('type', 'AUTH_ERROR');
  });
});
