import queryString from "query-string";

interface QueryParams {
  [searchKey: string]: string;
}

/**
 *
 * @param query: { [searchKey: string]: value }
 * @example: history.push({ pathname: '/', search: queryConcat({ id: '1', secret: 'abc' }) }) // --> '?id=1&secret=abc'
 */

export const queryStringify = (parsedQuery: QueryParams) => {
  // const queryStrings = Object.keys(query)
  // return queryStrings.reduce((searchValue, searchKey, i, a) => {
  //   const queryValue = query[searchKey]
  //   if (i === a.length - 1) {
  //     return `${searchValue}${searchKey}=${queryValue}`
  //   }

  //   return `${searchValue}${searchKey}=${queryValue}&`
  // }, '?')
  const stringifiedQuery = queryString.stringify(parsedQuery);
  return `?${stringifiedQuery}`;
};

export const queryParse = (stringifiedQuery: string) => {
  const routeQueries = queryString.parse(stringifiedQuery);
  return {
    ...(routeQueries as { [key: string]: string })
  };
};
