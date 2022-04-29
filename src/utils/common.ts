import _ from 'lodash';

/**
 * Copy value to other object
 * @param {any} val1  Object that need to copy value
 * @param {any} val2  Object with copy value
 * @param {Array<string>} keyArray List of names
 */
const copyProperties = (val1:any, val2:any, keyArray?:Array<string>)=>{
  let keys;
  if (keyArray) {
    keys = keyArray;
  } else {
    keys = Object.keys(val1);
  }
  for (const key of keys) {
    if (val2[key]) {
      val1[key] = val2[key];
    }
  }
};
/**
 * Copy value from val2 to val1 by val2 keys
 * @param {any} val1 Object that need to copy value
 * @param {any} val2 Object with copy value
 * @param {Array<string>}keyArray
 */
copyProperties.byVal2 = (val1:any, val2:any, keyArray?:Array<string>)=>{
  let keys;
  if (keyArray) {
    keys = keyArray;
  } else {
    keys = Object.keys(val2);
  }
  for (const key of keys) {
    if (val2[key]) {
      val1[key] = val2[key];
    }
  }
};


/**
 * According to list of names to judge two objects is equal or no
 * @param {any} val1
 * @param {any} val2
 * @param {Array<string>} keyArray List of names
 * @return {Boolean} return true or false
 */
const isEqual = (val1:any, val2:any, keyArray:Array<string>) =>{
  const val1Agent:any = {};
  const val2Agent:any = {};
  for (const key of keyArray) {
    val1Agent[key] = _.cloneDeep(val1[key]);
    val2Agent[key] = _.cloneDeep(val2[key]);
  }
  return _.isEqual(val1Agent, val2Agent);
};


/**
 * log print
 * type: success,warning,error
 * @param {any} logObj
 * @param {boolean} json
 */
const log = (logObj:any, json = true)=>{
  if (json === true) {
    logObj = JSON.stringify(logObj);
  }
  console.log(logObj);
};


log.error = (logObj:any, json = true)=>{
  if (json === true) {
    logObj = JSON.stringify(logObj);
  }
  console.log('%c'+logObj, 'color:#DC143C');
};

log.success = (logObj:any, json = true)=>{
  if (json === true) {
    logObj = JSON.stringify(logObj);
  }
  console.log('%c'+logObj, 'color:#00FF7F');
};

log.warning = (logObj:any, json = true)=>{
  if (json === true) {
    logObj = JSON.stringify(logObj);
  }
  console.log('%c'+logObj, 'color:#FF8C00');
};

export {
  copyProperties,
  isEqual,
  log,
};
