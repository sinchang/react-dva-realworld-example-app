import request from '../utils/request';
import qs from 'qs';

export function fetch(query = {}) {
  return request(`/articles?${qs.stringify(query)}`, {
    method: 'GET'
  });
}

export function get(slug) {
  return request(`/articles/${slug}`, {
    method: 'GET'
  });
}
