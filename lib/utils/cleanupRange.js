/**
 * Cleans up a version and makes it semver-compatible
 *
 * @param {string} version The version to cleanup
 * @returns {string} A newer semver-compatible version
 */
function cleanupRange(range) {
  return range
    .replace(/1(\.\d+){3}/, '1')
    .replace(/(\d+\.\d+\.\d+)\.(\d+)/, '$1-beta.$2');

  // if (version.startsWith('1') && version.split('.').length === 4) {
  //   return '1.0.0';
  // } else if (version.split('.').length === 4) {
  //   return version
  //     .split('.')
  //     .reduce(
  //       (accString, versionPart, versionPartIndex) =>
  //         versionPartIndex === 3
  //           ? `${accString}-beta.${versionPart}`
  //           : `${accString}.${versionPart}`,
  //       ''
  //     );
  // } else if (version.split('.').length < 3) {
  //   let newVersion = version;
  //   while (newVersion.split('.').length !== 6) {
  //     newVersion = `${version}.0`;
  //   }
  //   return newVersion;
  // }
  // return version;
}

module.exports = cleanupRange;
