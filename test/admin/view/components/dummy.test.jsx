import React from 'react';
import DummyComponent from 'view/components/dummy.jsx';
var expect = require('chai').expect;

describe('sanity', function () {
    it("true should be true", function () {
        expect(true).to.be.true;
    });

    it("should load components", () => {
        var dummy = <DummyComponent/>.toString();
        expect(dummy).to.be.a('string');
    })
});