import request from '../utils/request';

export function fetch(slug) {
  return request(`/articles/${slug}/comments`, {
    method: 'GET'
  });
}

export function create(slug, body) {
  return request(`/articles/${slug}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      comment: {
        body
      }
    })
  });
}

export function del(slug, id) {
  return request(`/articles/${slug}/comments/${id}`, {
    method: 'DELETE'
  });
}