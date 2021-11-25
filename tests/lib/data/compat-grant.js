const compatMap = require('../../../lib/data/compat-grant');

require('should');

describe('grant data', () => {
  it('should be an object', () => {
    compatMap.should.be.an.Object;
  });

  it('should have arrays as all the values with a schema', () => {
    Object.values(compatMap).should.matchEach((compatabilityData) => {
      compatabilityData.should.be.an.Array;
      compatabilityData.should.matchEach((compatabilityAssertion) => {
        compatabilityAssertion.should.have
          .property('type')
          .a.String()
          .equalOneOf(['tampermonkey', 'greasemonkey', 'violentmonkey']);
        compatabilityAssertion.should.have.property('versionConstraint').a
          .String;
      });
    });
  });
});
