import RegisterCarReducer, {
    initialState,
    SELECT_DERIVATIVE,
    SELECT_VEHICLE,
    SELECT_PACKAGE,
    CarRegisterDomain,
    INIT_SELECT_EXTRAS,
    SELECT_COLOR,
    SELECT_EXTRAS,
    SELECT_BRAND,
    SELECT_MODEL
} from 'client/car-register/RegisterCar.reducer';

describe('[unit] RegisterCar.reducer', function () {
    const reducer = (action, state = initialState) => RegisterCarReducer(state, action);

    it('should return initial state', function () {
        let defaultState = reducer({});

        expect(defaultState).to.deep.equal(initialState);
    });

    it('should return object has brand was selected and model is null if action type is' + SELECT_BRAND, function () {
        let action = {
            type: SELECT_BRAND,
            domain: CarRegisterDomain,
            brandName: 'Audi'
        }
        let newState = reducer(action);
        expect(newState.brand).to.equal(action.brandName);
        expect(newState.model).to.equal(null);
    });

    it('should return object has model was selected if action type is ' + SELECT_MODEL, function () {
        let action = {
            type: SELECT_MODEL,
            domain: CarRegisterDomain,
            modelName: 'R8'
        }
        let newState = reducer(action);
        expect(newState.model).to.equal(action.modelName);
    });

    it('should return array of selected derivatives if action type is ' + SELECT_DERIVATIVE, function () {
        let action = {
            type: SELECT_DERIVATIVE,
            domain: CarRegisterDomain,
            derivative: "A",
            derivativeType: "fuels"
        };

        let newState = reducer(action);
        expect(newState.selectedDerivatives.fuels).to.not.empty;
    });

    it('should add new selected transmission derivative into transmission selected list if action type is ' + SELECT_DERIVATIVE, function () {
        let action = {
            type: SELECT_DERIVATIVE,
            domain: CarRegisterDomain,
            derivative: "B",
            derivativeType: "trans"
        };

        let newState = reducer(action);
        expect(newState.selectedDerivatives.trans).to.contain(action.derivative);
    });

    it('should add new selected door derivative into door selected list if action type is ' + SELECT_DERIVATIVE, function () {
        let action = {
            type: SELECT_DERIVATIVE,
            domain: CarRegisterDomain,
            derivative: "C",
            derivativeType: "doors"
        };

        let newState = reducer(action);
        expect(newState.selectedDerivatives.doors).to.contain(action.derivative);
    });

    it('should return a state has same selected vehicleId if action type is ' + SELECT_VEHICLE, function () {
        let action = {
            type: SELECT_VEHICLE,
            domain: CarRegisterDomain,
            vehicleId: 1234
        };
        let newState = reducer(action);
        expect(newState.vehicleId).to.equal(action.vehicleId);
    });

    it('should return a state has same selected packageId if action type is ' + SELECT_PACKAGE, function () {
        let action = {
            type: SELECT_PACKAGE,
            domain: CarRegisterDomain,
            packageId: 1111
        };
        let newState = reducer(action);
        expect(newState.packageId).to.equal(action.packageId);
    });

    it('should add new selected extra into extras list if action type is ' + SELECT_EXTRAS, function () {
        let action = {
            type: SELECT_EXTRAS,
            domain: CarRegisterDomain,
            optionId: 8888
        };
        let newState = reducer(action);
        expect(newState.selectedExtras.extras).to.contain(action.optionId);
    });

    it('selected color should be update if action type is ' + SELECT_COLOR, function () {
        let action = {
            type: SELECT_COLOR,
            domain: CarRegisterDomain,
            optionId: 9999
        };
        let newState = reducer(action);
        expect(newState.selectedExtras.color).to.equal(action.optionId);
    });
});
