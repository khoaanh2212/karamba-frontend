import authReducer from 'reducers/authReducer';

describe("authReducer", () => {
    const authDomain = 'auth';
    const notAuthDomain = 'notAuth';
    const initialState = {
        isLogged: false,
        token: null
    };

    it("should return initial state", () => {
        expect(authReducer(undefined, {})).to.be.deep.equal(initialState)
    });

    it("should return the new state from action if it is from auth domain", () => {
        let authDomainAction = {
            type: 'LOGIN_SUCCESS',
            domain: authDomain,
            run: state => ({...state, isLogged: true, token: 'fakeToken'})
        };

        expect(authReducer(undefined, authDomainAction)).to.be.deep.equal({
            isLogged: true,
            token: 'fakeToken'
        })
    });

    it("should return the old state from action if it is not from auth domain", () => {
        let nonAuthDomainAction = {
            type: 'LOGIN_SUCCESS',
            domain: notAuthDomain,
            run: state => ({...state, isLogged: true, token: 'fakeToken'})
        };

        expect(authReducer(undefined, nonAuthDomainAction)).to.be.deep.equal(initialState)
    });
});