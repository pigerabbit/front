import axios from "axios";

const backendPortNumber = "5000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = "", queryParams = {}) {
  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    params: queryParams,
  });
}

async function getNoCache(endpoint, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      "Cache-Control": "no-cache",
    },
  });
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function patch(endpoint, params = "", data) {
  const bodyData = JSON.stringify(data);

  return axios.patch(serverUrl + endpoint + "/" + params, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function del(endpoint, params = "", data = {}) {
  const bodyData = JSON.stringify(data);

  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      "Content-Type": "application/json",
    },
    data: bodyData,
  });
}

async function postImg(endpoint, data) {
  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function putImg(endpoint, data) {
  return axios.put(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export {
  get,
  getNoCache,
  post,
  put,
  patch,
  del as delete,
  postImg,
  putImg,
  serverUrl,
};
