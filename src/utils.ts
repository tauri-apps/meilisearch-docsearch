/*
 * Rename the keys containing a 'lvlX' into 'lvlX' only
 * eg.
 * {
 *   name: 'My name',
 *   hierarchy_lvl0: 'Foo',
 *   hierarchy_lvl1: 'Bar'
 * }
 * Will be converted to
 * {
 *   name: 'My name',
 *   lvl0: 'Foo',
 *   lvl1: 'Bar'
 * }
 * @param {Object} object Main object
 * @param {String} prefix Main object key to move rename
 * @return {Object}
 */
export function renameKeysWithLevels<T extends Record<any, any>>(
  object: T,
  prefix: string,
): T {
  return Object.keys(object).reduce((acc, key) => {
    const result: any = acc;
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");
      result[newKey] = object[key];
    } else {
      result[key] = object[key];
    }
    return result;
  }, {} as T);
}

/*
 * Replace string "null" by a null
 * @param {Object} object Main object
 * @return null or {String}
 */
export function replaceNullString<T extends { [key: string]: unknown }>(
  object: T,
): T {
  return Object.keys(object).reduce((acc, key) => {
    const result: any = acc;
    if (typeof object[key] === "string" && object[key] === "null") {
      result[key] = null;
    } else {
      result[key] = object[key];
    }
    return result;
  }, {} as T);
}

/*
 * Group all objects of a collection by the value of the specified attribute
 * If the attribute is a string, use the lowercase form.
 *
 * eg.
 * groupBy([
 *   {name: 'Tim', category: 'dev'},
 *   {name: 'Vincent', category: 'dev'},
 *   {name: 'Ben', category: 'sales'},
 *   {name: 'Jeremy', category: 'sales'},
 *   {name: 'AlexS', category: 'dev'},
 *   {name: 'AlexK', category: 'sales'}
 * ], 'category');
 * =>
 * {
 *   'devs': [
 *     {name: 'Tim', category: 'dev'},
 *     {name: 'Vincent', category: 'dev'},
 *     {name: 'AlexS', category: 'dev'}
 *   ],
 *   'sales': [
 *     {name: 'Ben', category: 'sales'},
 *     {name: 'Jeremy', category: 'sales'},
 *     {name: 'AlexK', category: 'sales'}
 *   ]
 * }
 * @param {array} collection Array of objects to group
 * @param {String} property The attribute on which apply the grouping
 * @return {array}
 * @throws Error when one of the element does not have the specified property
 */
export function groupBy<T, K extends keyof T>(
  collection: T[],
  property: K,
): { [K in keyof T]: T[] } {
  const newCollection: any = {};
  collection.forEach((item: any) => {
    if (item[property] === undefined) {
      throw new Error(`[groupBy]: Object has no key ${new String(property)}`);
    }
    let key = item[property];

    // the given data type of hits might be conflict with the properties of the native Object,
    // such as the constructor, so we need to do this check.
    if (!Object.prototype.hasOwnProperty.call(newCollection, key)) {
      newCollection[key] = [];
    }
    newCollection[key].push(item);
  });
  return newCollection;
}

/*
 * Removes all empty strings, null, false and undefined elements array
 * eg.
 * compact([42, false, null, undefined, '', [], 'foo']);
 * =>
 * [42, [], 'foo']
 * @param {array} array Array to compact
 * @return {array}
 */
export function compact<T>(array: T[]) {
  const results: T[] = [];
  array.forEach((value) => {
    if (!value) {
      return;
    }
    results.push(value);
  });
  return results;
}

/*
 * Returns the highlighted value of the specified key in the specified object.
 * If no highlighted value is available, will return the key value directly
 * eg.
 * getHighlightedValue({
 *    _formatted: {
 *      text: '<em>foo</em>'
 *    },
 *    text: 'foo'
 * }, 'text');
 * =>
 * '<em>foo</em>'
 * @param {object} object Hit object returned by the Meilisearch API
 * @param {string} property Object key to look for
 * @return {string}
 **/
export function getHighlightedValue<T extends Record<any, any>>(
  object: T,
  property: string,
): string {
  if (
    object._formatted &&
    object._formatted[property] &&
    typeof object._formatted[property] === "string"
  ) {
    return replaceHtmlTagsToHighlight(object._formatted[property]);
  }
  return object[property];
}

/*
 * Returns the formatted string with the right HTML tags to highlight in
 * the dropdown.
 * @param {string} the string containing <em> tags
 * @return {string}
 **/
export function replaceHtmlTagsToHighlight(str: string) {
  return str
    .replace(
      /<em>/g,
      '<span class="docsearch-modal-search-hits-item--highlight">',
    )
    .replace(/<\/em>/g, "</span>");
}

/*
 * Returns the snippeted value of the specified key in the specified object.
 * If no highlighted value is available, will return the key value directly.
 * Will add starting and ending ellipsis (…) if we detect that a sentence is
 * incomplete
 * eg.
 * getSnippetedValue({
 *    _formatted: {
 *      text: '<em>This is an unfinished sentence</em>'
      },
 *    text: 'This is an unfinished sentence'
 * }, 'text');
 * =>
 * '<em>This is an unfinished sentence</em>…'
 * @param {object} object Hit object returned by the Meilisearch API
 * @param {string} property Object key to look for
 * @return {string}
 **/
export function getSnippetedValue(object: Record<any, any>, property: string) {
  if (
    !object._formatted ||
    !object._formatted[property] ||
    typeof object._formatted[property] !== "string"
  ) {
    return object[property];
  }
  let snippet = replaceHtmlTagsToHighlight(object._formatted[property]);
  if (snippet[0] !== snippet[0].toUpperCase()) {
    snippet = `…${snippet}`;
  }
  if ([".", "!", "?"].indexOf(snippet[snippet.length - 1]) === -1) {
    snippet = `${snippet}…`;
  }
  return snippet;
}

/*
 * Deep clone an object.
 * Note: This will not clone functions and dates
 * @param {object} object Object to clone
 * @return {object}
 */
export function deepClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Debounce a function to be executed only once after a timeout has passed.
 */
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number = 300,
): (...args: Parameters<F>) => void {
  let timeout: number;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
