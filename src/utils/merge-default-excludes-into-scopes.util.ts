type ScopeDefinition = {
  include?: any[];
  attributes?: {
    exclude?: string[];
    [key: string]: any;
  };
  [key: string]: any;
};

type ScopesMap = Record<string, ScopeDefinition>;

export function mergeDefaultExcludesIntoScopes(
  baseScopes: ScopesMap,
  defaultExcludes: string[],
  ignoreScopes: string[] = ["defaultScope", "withMeta"]
): ScopesMap {
  const mergedScopes: ScopesMap = {};

  for (const [name, scope] of Object.entries(baseScopes)) {
    if (ignoreScopes.includes(name)) {
      mergedScopes[name] = scope;
      continue;
    }

    const mergedAttributes = {
      ...(scope.attributes || {}),
      exclude: [
        ...new Set([...(scope.attributes?.exclude || []), ...defaultExcludes]),
      ],
    };

    mergedScopes[name] = {
      ...scope,
      attributes: mergedAttributes,
    };
  }

  return mergedScopes;
}
