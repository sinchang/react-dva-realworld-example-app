import request from '../utils/request';

export function register(user) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify({
      user
    })
  });
}

export function login(user) {
  return request('/users/login', {
    method: 'POST',
    body: JSON.stringify({
      user
    })
  });
}

export function current(user) {
  return request('/user', {
    method: 'GET',
  });
}