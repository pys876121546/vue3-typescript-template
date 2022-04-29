import {log} from '@/utils/common';

/**
 * Get all localStorage
 */
const localStorage = ()=>{
  window.localStorage;
};

/**
 * Set localStorage by key
 * @param {string} key
 * @param {any} obj
 */
localStorage.prototype.set = (key:string, obj:any)=>{
  if (!(obj instanceof String)) {
    obj = JSON.stringify(obj);
  }
  window.localStorage.setItem(key, obj);
};

/**
 * Get localStorage by key
 * @param {string} key
 * @return {any} obj
 */
localStorage.get = (key:string)=>{
  let obj = window.localStorage.getItem(key);
  if (obj) {
    try {
      obj = JSON.parse(obj);
    } catch (e) {
      log.error(`format localStorage ${key} failed`);
    }
    return obj;
  } else {
    return null;
  }
};

/**
 * remove localStorage by key
 * @param {string} key
 */
localStorage.remove = (key:string)=>{
  window.localStorage.removeItem(key);
};

/**
 * clear all localStorage
 */
localStorage.clear = ()=>{
  window.localStorage.clear();
};

export default localStorage;
