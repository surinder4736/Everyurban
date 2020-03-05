
 //import { ENV } from './env';
const ENV =  process.env.NODE_ENV || 'development';
console.log("Server Mode:"+ENV)
const envVars=require(`./config.${ENV}.js`);
export const isProduction = ENV === 'production' || 'staging';
export const isDebug = ENV === 'development' || 'staging' ;
export const isClient = typeof window !== 'undefined';
export const BASE_URL=envVars.BASE_URL;
export const APIURL=envVars.APIURL;
export const hostName = envVars.hostName;
console.log(hostName);
export const checkAppHostName = envVars.checkAppHostName;

//export const APIURL='https://122.160.166.186:9007/api/';
//export const APIURL='http://localhost:5000/api/';
// export const APIURL='http://122.160.166.186:8082/api/';
// export const BASE_URL='http://122.160.166.186:8082';
// export const APIURL='http://localhost:5000/api/';
// export const BASE_URL='http://localhost:5000';