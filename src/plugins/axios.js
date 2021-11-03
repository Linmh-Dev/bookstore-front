"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router/index.js'

let config = {
   //baseURL:"http://localhost:8080/",
   baseURL:"http://81.71.33.214:8080/",
   timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    if(response.data.code === 402) {
        router.push("/login")
/*        Vue.prototype.$notify({
            title: '没有权限',
            message: '该操作需要管理员身份执行',
            type: 'error'
        });
        router.go(-1)*/
    }else if (response.data.code===403) {
        Vue.prototype.$notify({
            title: '没有权限',
            message: '该操作需要管理员身份执行',
            type: 'error'
        });
        router.go(-1)
      //退出登录
      //router.push("/")
    }
      return response;
  },
  function(error,res) {
    // Do something with response error

    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
