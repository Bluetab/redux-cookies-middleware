import _ from 'lodash';
import { getCookie as getBrowserCookie } from './cookieApi';

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
) => {
  const cookieValues = _.mapValues(
    paths,
    (value, key, object) => getCookie(_.get(value, "name"))
  );

  return _.reduce(
    cookieValues,
    (res, value, key) => (value !== undefined) ? _.set(res, key, JSON.parse(value)) : res,
    preloadedState
  );
};

export default getStateFromCookies;
