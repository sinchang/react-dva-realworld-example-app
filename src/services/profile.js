import request from '../utils/request';

export function fetch(username) {
  return request(`/profiles/${username}`, {
    method: 'GET'
  });
}