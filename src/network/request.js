import  axios from 'axios'


export function request(config){
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/w1',
    timeout: 5000
  })

  //拦截响应数据
  instance.interceptors.response.use(res =>{
    return res
  },error => {
    return error
  })
  //发送真正的网络请求
  return instance(config)
}
