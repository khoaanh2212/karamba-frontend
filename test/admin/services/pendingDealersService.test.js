import {fetchPendingDealers} from "services/pendingDealersService";
import {acceptPendingDealer} from "services/pendingDealersService";
import {rejectPendingDealer} from "services/pendingDealersService";

describe("pendingDealersService", () => {
    it("should return FETCH_PENDING_DEALERS_SUCCESS on receive pending dealers", () => {
        return expect(fetchPendingDealers()).to.eventually.have.property('type', 'FETCH_PENDING_DEALERS_SUCCESS');
    });

    it("acceptPendingDealer returns ACCEPT_DEALER_SUCCESS when valid ID", () => {
        return expect(acceptPendingDealer("01a9061c-4da9-4454-b70b-6c256fe86104")).to.eventually.have.property('type', 'ACCEPT_DEALER_SUCCESS');
    });

    it("rejectPendingDealer returns REJECT_DEALER_SUCCESS when valid ID", () => {
        return expect(rejectPendingDealer("01a9061c-4da9-4454-b70b-6c256fe86104")).to.eventually.have.property('type', 'REJECT_DEALER_SUCCESS');
    });
    
    it("acceptPendingDealer returns ACCEPT_DEALER_ERROR when false ID", () => {
        return expect(acceptPendingDealer("false-id")).to.eventually.have.property('type', 'ACCEPT_DEALER_ERROR');
    });

    it("rejectPendingDealer returns REJECT_DEALER_ERROR when false ID", () => {
        return expect(rejectPendingDealer("false-id")).to.eventually.have.property('type', 'REJECT_DEALER_ERROR');
    });
});