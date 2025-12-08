export type VersionAssertion = {
  type:
    | 'adguard'
    | 'greasemonkey'
    | 'scriptcat'
    | 'tampermonkey'
    | 'violentmonkey';
  versionConstraint: string;
};

export type CompatMap = {
  [Key in string]?: VersionAssertion[];
};
