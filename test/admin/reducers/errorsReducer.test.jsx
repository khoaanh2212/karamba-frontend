import errorsReducer from 'reducers/errorsReducer';

describe("errorsReducer", () => {
    const errorsDomain = 'errors';
    const notErrors = 'notErrors';
    const initialState = [];

    it("should return initial state", () => {
        expect(errorsReducer(undefined, {})).to.be.deep.equal(initialState)
    });

    it("should return the new state from action if it is from errors domain", () => {
        let errorsDomainAction = {
            type: 'LOGIN_ERROR',
            domain: errorsDomain,
            run: state => state.concat({errorMessage: 'This is an error'})
        };

        expect(errorsReducer(undefined, errorsDomainAction)).to.be.deep.equal([
            {errorMessage: 'This is an error'}
        ]);
    });

    it("should return the old state from action if it is not from errors domain", () => {
        let nonErrorsAction = {
            type: 'LOGIN_SUCCESS',
            domain: notErrors,
            run: state => ({...state, errorMessage: 'Nothing happens'})
        };

        expect(errorsReducer(undefined, nonErrorsAction)).to.be.empty;
    });
});