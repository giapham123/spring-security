import axios from 'axios';

// import { AUTH_HEADER_KEY } from 'core/constants';

export default class Service {
  static requestInterceptors;

  static setToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // axios.defaults.headers.common['Authorization'] =  'Bearer ' + token;
  }

  static removeToken() {
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  static interceptors({ request }) {
    if (request) this.requestInterceptors = request;
  }

  /**
   * Creates an instance of Service.
   *
   * @memberOf Service
   */
  constructor(namespace) {
    // Accept */*
    axios.defaults.headers.common['Accept'] = '*/*';
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const endpoint = `${process.env.REACT_APP_SHOP}`
    const baseURL = endpoint + (namespace ? `/${namespace}/` : '/');
    this.axios = axios.create({
      baseURL,
      responseType: 'json'
    });
  }

  withHeader(headers) {
    this.headers = headers;
    return this;
  }

  toQueryString(obj) {
    const parts = [];
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  /**
   * Call a service action via REST API
   *
   * @param {any} action  name of action
   * @param {any} params  parameters to request
   * @returns  {Promise}
   *
   * @memberOf Service
   */
  async rest(
    action,
    params,
    options = {
      method: 'post'
    }
  ) {
    if (Service.requestInterceptors) {
      this.axios.interceptors.request.use(Service.requestInterceptors);
    }
    const { headers = {} } = options;
    try {
      const opts = {
        method: options.method,
        data: params,
        headers: {
          ...(this.headers || {}),
          ...headers
        }
      };
      const response = await this.axios.request(action, opts);
      // const { data } = response;
      // eslint-disable-next-line
      //console.log('data in core', response);
      return response;
      // const { ifSuccess, message } = data;
      // if (ifSuccess) return data;
      // throw new Error(message);
    } catch (err) {
      throw err;
    }
  }

  get(action, params, options = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.rest(
      path,
      {},
      {
        method: 'get',
        headers
      }
    );
  }

  post(action, params, options = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'post',
      headers
    });
  }

  put(action, params, options = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'put',
      headers
    });
  }
}
