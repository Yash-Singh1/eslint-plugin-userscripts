export function cleanupRange(range: string) {
  return range
    .replace(/1(\.\d+){3}/, '1')
    .replace(/(\d+\.\d+\.\d+)\.(\d+)/, '$1-beta.$2');
}
