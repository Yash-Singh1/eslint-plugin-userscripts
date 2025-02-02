import type {
  CompatMap,
  VersionAssertion
} from '../../../lib/data/version-assertion';
import { compatMap } from '../../../lib/data/compat-headers';

import 'should';

describe('headers data', () => {
  it('should be an object', () => {
    compatMap.should.be.an.Object;
  });

  it('should have arrays as all the values with a schema', () => {
    Object.values(compatMap).should.matchEach(
      (compatabilityDataCategory: CompatMap) => {
        compatabilityDataCategory.should.be.an.Object;
        Object.values(compatabilityDataCategory).should.matchEach(
          (compatabilityData: VersionAssertion[]) => {
            compatabilityData.should.be.an.Array;
            compatabilityData.should.matchEach(
              (compatabilityAssertion: VersionAssertion) => {
                compatabilityAssertion.should.have
                  .property('type')
                  .a.String()
                  .equalOneOf([
                    'adguard',
                    'tampermonkey',
                    'greasemonkey',
                    'violentmonkey'
                  ]);
                compatabilityAssertion.should.have.property('versionConstraint')
                  .a.String;
              }
            );
          }
        );
      }
    );
  });
});
