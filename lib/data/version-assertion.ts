export type VersionAssertion = {
  type: 'tampermonkey' | 'violentmonkey' | 'greasemonkey';
  versionConstraint: string;
};

export type CompatMap = {
  [Key in string]?: VersionAssertion[];
};
