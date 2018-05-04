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

export function create(article) {
  return request(`/articles`, {
    method: 'POST',
    body: JSON.stringify({
      article
    })
  });
}

export function update(payload) {
  return request(`/articles/${payload.slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      article: payload.article
    })
  });
}

export function del(slug) {
  return request(`/articles/${slug}`, {
    method: 'DELETE'
  });
}
