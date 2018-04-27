import request from '../utils/request';

export function fetch(query = {}) {
  return request('/tags', {
    method: 'GET'
  });
}