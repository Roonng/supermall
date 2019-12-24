import  axios from 'axios'


export function request(config){
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  })
  //发送真正的网络请求
  return instance(config)
}
