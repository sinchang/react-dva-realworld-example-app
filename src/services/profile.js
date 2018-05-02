import request from '../utils/request';

export function fetch(username) {
  return request(`/profiles/${username}`, {
    method: 'GET'
  });
}

export function follow(username) {
  return request(`/profiles/${username}/follow`, {
    method: 'POST'
  });
}

export function unfollow(username) {
  return request(`/profiles/${username}/follow`, {
    method: 'DELETE'
  });
}