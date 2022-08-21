const {
  compatMap,
  gmPolyfillOverride
} = require('../../../lib/data/compat-grant');

require('should');

function validateCompatibilityData(compatabilityData) {
  compatabilityData.should.be.an.Array;
  compatabilityData.should.matchEach((compatabilityAssertion) => {
    compatabilityAssertion.should.have
      .property('type')
      .a.String()
      .equalOneOf(['tampermonkey', 'greasemonkey', 'violentmonkey']);
    compatabilityAssertion.should.have.property('versionConstraint').a.String;
  });
}

describe('grant data', () => {
  it('should be an object', () => {
    compatMap.should.be.an.Object;
  });

  it('should have arrays as all the values with a schema', () => {
    Object.values(compatMap).should.matchEach((compatabilityData) => {
      validateCompatibilityData(compatabilityData);
    });
  });
});

describe('gm polyfill overrides', () => {
  it('should be an object', () => {
    gmPolyfillOverride.should.be.an.Object;
  });

  it('should have valid format', () => {
    Object.values(gmPolyfillOverride).should.matchEach((grantFuncOverride) => {
      if (typeof grantFuncOverride === 'string') {
        grantFuncOverride.should.eql('ignore');
      } else if (Array.isArray(grantFuncOverride)) {
        validateCompatibilityData(grantFuncOverride);
      } else {
        grantFuncOverride.should.be.an.Object;
        if (grantFuncOverride.deps) {
          grantFuncOverride.deps.should.be.an.Array;
          grantFuncOverride.deps.should.matchEach((grantDep) => {
            grantDep.should.be.an.String;
          });
        }
        if (grantFuncOverride.versions) {
          validateCompatibilityData(grantFuncOverride.versions);
        }
      }
    });
  });
});
