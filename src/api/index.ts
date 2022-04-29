import axios, {AxiosRequestConfig, Canceler, Method} from 'axios';
import {copyProperties, isEqual} from '@/utils/common';

/**
 * The interface of request object
 */
interface PendingType{
    url?:string,
    method?:Method,
    params?:any,
    data?:any,
    cancel?:Canceler
}

/**
 * Unified handing of request failed
 * @param {number} status Error code
 * @param {string} other  Error message
 */
const errorHandle = (status:number, other:string)=>{
  switch (status) {
    case 302:
      //  重定向
      console.log(other);
      break;
    default:
      break;
  }
};

// Cancel repetitive request
const pending:Array<PendingType> = [];
const CancelToken = axios.CancelToken;

/**
 * Remove repetitive request
 * @param {AxiosRequestConfig} config  Axios config object
 */
const removePending = (config:AxiosRequestConfig) =>{
  // get index and object of request queue
  for (const [key, item] of pending.entries()) {
    const index:number = +key;
    // Judge two objects are equal or not
    if (isEqual(item, config, ['url', 'method', 'params', 'data'])) {
      // If it's true, it means repetitive and cancel this request
      if (item.cancel) {
        item.cancel('The operation is too frequent, please try again later');
      }
      pending.splice(index, 1);
    }
  }
};

/**
 * instantiation request config
 */
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*',
  },
  timeout: 1000*30,
  // Get api address in config file
});

/**
 * Request interceptor
 */
instance.interceptors.request.use(
    (config) => {
      // Check this request are repetitive or no
      removePending(config);
      // Push this request to queue
      config.cancelToken = new CancelToken((c)=>{
        const pendingItem:PendingType = {};
        copyProperties(pendingItem, config, ['url', 'method', 'data', 'params']);
        pendingItem.cancel = c;
        pending.push(pendingItem);
      });
      // You can add token check in here
      return config;
    },
    (error) => {
      return error.data;
    },
);
/**
 * Response interceptor
 */
instance.interceptors.response.use(
    (config)=>{
      // request success, so remove this request on queue
      removePending(config.config);
      if (config.status === 200 || config.status === 204) {
        return config.data;
      } else {
        return Promise.reject(config);
      }
    },
    (error) => {
      // Request failed
      const {response} = error;
      if (response) {
        errorHandle(response.status, response.data.message);
        // Because timeout so retry the request
        const config = error.config;
        // The count of global requests, the interval between requests
        const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
        if (config && RETRY_COUNT) {
          // Set Variable for tracking retry count
          config.__retryCount = config.__retryCount || 0;
          // Check retry count are use up or no
          if (config.__retryCount>=RETRY_COUNT) {
            return Promise.reject(response||{message: error.message});
          }
          // add resend count
          config.__retryCount++;
          // Create a new Promise to handle exponential regression
          const backoff = new Promise<void>((resolve) => {
            setTimeout(()=>{
              resolve();
            }, RETRY_DELAY || 1);
          });
            // instance重试请求的Promise
            // Instance retry the requested Promise
          return backoff.then(()=>{
            return instance(config);
          });
        }
        return Promise.reject(response);
      } else {
        // The handle of network error
        // eg: When requesting timeout or network disconnection,update network status in state
        // The network status can do some tips to users in follow-up business
        // You can add some business in here
      }
    },
);

export default instance;

