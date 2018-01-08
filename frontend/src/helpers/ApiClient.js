import superagent from 'superagent';
import { setAuthDataToStore } from '../reducers/auth';
import { getAuthData, headers, clearAuthData } from './authData';
import includes from 'lodash/includes';
import keys from 'lodash/keys';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return `/api${adjustedPath}`;
}

class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, attach } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const authDataSource = getAuthData();

        if (includes(keys(authDataSource), ...headers)) {
          headers.forEach((header) => {
            request.set(header, authDataSource[header]);
          });
          request.set('token-type', 'Bearer');
        }

        if (params) {
          request.query(params);
        }

        if (attach) {
          for (const [fieldName, file] of Object.entries(attach)) {
            request.attach(fieldName, file);
          }
        }

        if (data) {
          request.send(data);
        }

        request.end((error, response) => {
          // this.store.dispatch(hideSpinner());
          if (error) {
            if (error.status === 401) {
              clearAuthData();
            }
            reject(response.body || error);
          } else {
            if ((/auth|users/).test(path) && response.headers['access-token']) {
              this.store.dispatch(setAuthDataToStore(response.headers));
            }
            return resolve(response.body);
          }
        });
      }));
  }

  setStore = (store) => {
    this.store = store;
  };
}

export default new ApiClient();