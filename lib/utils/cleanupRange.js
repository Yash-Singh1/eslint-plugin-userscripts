/**
 * Cleans up a range and makes it semver-compatible
 *
 * @param {string} range The range to cleanup
 * @returns {string} A newer semver-compatible range
 */
function cleanupRange(range) {
  return range
    .replace(/1(\.\d+){3}/, '1')
    .replace(/(\d+\.\d+\.\d+)\.(\d+)/, '$1-beta.$2');
}

module.exports = cleanupRange;
