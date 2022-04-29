import qs from 'qs';
import instance from '@/api';

/**
 * Example of post request
 * @param {any} data Post request parameters are formatted using qs
 * @return {axios} Returns an instance of axios
 */
const demoApi = (data:any)=>{
  return instance({
    method: 'POST',
    url: '/api/v1/demo',
    data: qs.stringify(data),
  });
};

export {demoApi};

