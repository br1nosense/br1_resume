import axios from 'axios'


const instance = axios.create({   // 创建实例
	baseUrl:"http://localhost:3000",  //api url地址
	timeOut:500             //请求超时时间
})
instance.interceptors.request.use(  //请求拦截
	(config)=>{
		return config
	},
	(err)=>{
		Promise.reject(err)
	}
)

instance.interceptors.reponse.use(   //响应拦截
	(res)=>{
		return res
	},
	(err)=>{
		Promise.reject(err)
	}
)

export default instance

