import axios from "axios";

const request = axios.create({
  baseURL:'http://localhost:8654/boot',
  timeout:5000
})

//请求的拦截器
request.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        return Promise.reject(error)
    }
)

//相应的连接器
request.interceptors.response.use(
    response=>{
        return response;
    },
    error=>{
        return Promise.reject(error)
    }
)

export default request