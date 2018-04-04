import axios from 'axios';

export const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

const client = () => {

  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return {
    get: (url, options={}) => axios.get(url, {...defaultOptions, ...options}),

    post: (url,data,options={}) => axios.post(url,data, {...defaultOptions, ...options}),

    patch: (url,data,options={}) => axios.patch(url,data, {...defaultOptions, ...options}),

    delete: (url,options={}) => axios.delete(url, {...defaultOptions, ...options})
  };

};

const request = client();

export default request;
