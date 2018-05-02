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

export function feed() {
  return request(`/articles/feed`, {
    method: 'GET'
  });
}

export function favorite(slug) {
  return request(`/articles/${slug}/favorite`, {
    method: 'POST'
  });
}

export function unFavorite(slug) {
  return request(`/articles/${slug}/favorite`, {
    method: 'DELETE'
  });
}
