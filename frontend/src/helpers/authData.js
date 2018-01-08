import cookies from 'browser-cookies';
import { isEmpty, pickBy } from 'lodash';

export const headers = ['uid', 'access-token', 'client', 'expiry'];

export function setAuthData(data) {
  if (data) {
    headers.forEach((key) => {
      cookies.set(key, data[key].toString(), { expires: 14 });
    });
  }
}

export function getAuthData() {
  const data = {};
  headers.forEach((key) => {
    data[key] = cookies.get(key);
  });
  return data;
}

export function clearAuthData() {
  headers.forEach((key) => cookies.erase(key));
}

export function prepareAuthData(data) {
  const preparedData = {};
  headers.forEach(header => {
    preparedData[header] = data[header];
  });
  return !isEmpty(pickBy(preparedData)) ? preparedData : false;
}
