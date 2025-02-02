export type VersionAssertion = {
  type: 'adguard' | 'tampermonkey' | 'violentmonkey' | 'greasemonkey';
  versionConstraint: string;
};

export type CompatMap = {
  [Key in string]?: VersionAssertion[];
};
