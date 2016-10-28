import { clientCreate, clientLogin, clientUpdate } from 'services/Client.service';
import { CREATE_CLIENT_SUCCESS, CREATE_CLIENT_ERROR, UPDATE_CLIENT_SUCCESS } from 'client/Client.reducer';

describe("[integration] Client.service", () => {
  it("should return an action type " + CREATE_CLIENT_SUCCESS, () => {
    return expect(clientCreate({})).to.eventually.have.property('type', CREATE_CLIENT_SUCCESS);
  });
});

describe("[integration] Client.service", () => {
  it("should return an action type " + UPDATE_CLIENT_SUCCESS, () => {
    return expect(clientUpdate('fake-token',{})).to.eventually.have.property('type', UPDATE_CLIENT_SUCCESS);
  });
});

describe("[integration] [Client] Login.service", () => {
  it("should return an action type AUTH_SUCCESS when valid user is logging in", () => {
      return expect(clientLogin("test_email@test.com", "some_password")).to.eventually.have.property('type', 'AUTH_SUCCESS');
  });

  it("should return an action type AUTH_ERROR when invalid user is provided", () => {
    return expect(clientLogin("fake", "fake")).to.eventually.have.property('type', 'AUTH_ERROR');
  });
});
