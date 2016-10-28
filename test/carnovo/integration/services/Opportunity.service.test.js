import {fetchOpportunities, fetchOpportunity} from 'services/Opportunity.service';
import {FETCH_OPPORTUNITIES_SUCCESS, FETCH_OPPORTUNITY_SUCCESS} from "dealer/private/opportunities/Opportunities.reducer";

describe("[integration] Opportunity.service", () => {
  it("should return an action type " + FETCH_OPPORTUNITIES_SUCCESS, () => {
    let validToken = 'valid-token';
    return expect(fetchOpportunities(validToken)).to.eventually.have.property('type', FETCH_OPPORTUNITIES_SUCCESS);
  });
  it("should return an action type " + FETCH_OPPORTUNITY_SUCCESS, () => {
    let validToken = 'valid-token';
    return expect(fetchOpportunity(validToken)).to.eventually.have.property('type', FETCH_OPPORTUNITY_SUCCESS);
  });
});
