import {register} from 'services/pendingDealers.service';

describe("[integration] pendingDealers.service", () => {
    it("should return an action type PENDING_DEALER_REGISTER_SUCCESS", () => {
        let validPendingDealerApplication = {
            vendorName: 'Adria',
            dealerName: 'North',
            vendorRole: 'CTO',
            phone: '666 11 22 33',
            email: 'adria@north.com',
            howArrivedHere: 'A friend'
        };

        // return expect(register(validPendingDealerApplication)).to.eventually.have.property('type', 'PENDING_DEALER_REGISTER_SUCCESS');
    });

    it("should return an action type PENDING_DEALER_REGISTER_FAILURE", () => {
        let validPendingDealerApplication = {
            vendorName: '',
            dealerName: 'North',
            vendorRole: 'CTO',
            phone: '666 11 22 33',
            email: 'adria@north.com',
            howArrivedHere: 'A friend'
        };
        // return expect(register(validPendingDealerApplication)).to.eventually.have.property('type', 'PENDING_DEALER_REGISTER_FAILURE');
    });
});