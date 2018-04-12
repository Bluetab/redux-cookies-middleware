import {
  compose,
  reduce,
  set,
  toPairs,
  mapValues,
  pickBy,
  negate,
  has,
  isUndefined
} from 'lodash/fp';
import { getCookie as getBrowserCookie } from './cookieApi';

const deepClone = (state) => JSON.parse(JSON.stringify(state));
const setValue = (acc, pair) => set(pair[0], pair[1])(acc);

/**
 * read browser cookie into state
 * @param {Object} preloaded state
 * @param {Object} paths
 * @param {Object} get Cookie implementation
 * @return {Object} new state
 */
const getStateFromCookies = (
    preloadedState,
    paths,
    getCookie = getBrowserCookie
) =>
  compose(
    reduce(setValue, deepClone(preloadedState)),
    toPairs,
    mapValues(JSON.parse),
    pickBy(negate(isUndefined)),
    mapValues(({name}) => getCookie(name)),
    pickBy(has("name"))
  )(paths);

export default getStateFromCookies;
