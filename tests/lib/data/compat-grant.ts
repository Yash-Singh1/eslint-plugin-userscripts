import { compatMap, gmPolyfillOverride } from '../../../lib/data/compat-grant';
import type { VersionAssertion } from '../../../lib/data/version-assertion';

import 'should';

function validateCompatibilityData(compatabilityData: VersionAssertion[]) {
  compatabilityData.should.be.an.Array;
  compatabilityData.should.matchEach(
    (compatabilityAssertion: VersionAssertion) => {
      compatabilityAssertion.should.have
        .property('type')
        .a.String()
        .equalOneOf(['tampermonkey', 'greasemonkey', 'violentmonkey']);
      compatabilityAssertion.should.have.property('versionConstraint').a.String;
    }
  );
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
          grantFuncOverride.deps.should.matchEach((grantDep: string) => {
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
