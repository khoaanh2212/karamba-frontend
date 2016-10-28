import {login} from 'services/authService';

describe("authService", () => {
    it("should return return LOGIN_SUCCESS on login success", () => {
        return expect(login('admin', '1234')).to.eventually.have.property('type', 'LOGIN_SUCCESS');
    });

    it("should return return LOGIN_ERROR on bad authentication", () => {
        return expect(login('admin', 'badPassword')).to.eventually.have.property('type', 'LOGIN_ERROR');
    });
});