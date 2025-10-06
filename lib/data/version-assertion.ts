export type VersionAssertion = {
  type: 'adguard' | 'tampermonkey' | 'violentmonkey' | 'greasemonkey' | 'scriptcat';
  versionConstraint: string;
};

export type CompatMap = {
  [Key in string]?: VersionAssertion[];
};
