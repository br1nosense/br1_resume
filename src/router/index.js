import VueRouter from "vue-router";
import Vue from 'vue'
//1.通过使用VUE.use()，安装插件

const Index = () => import('../views/index.vue')
const Home =() => import('@/views/home/home.vue')
const EditModule = () => import('../views/edit/edit_module.vue')
const Resumeshow = () =>import('../views/resume/resumeshow.vue')
const Login = () =>import('../views/login/Login.vue')
const Register = () =>import('../views/login/Register.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        name: 'index',
        redirect: '/home',
        children: [
            {path: 'home', component: Home},
      

        ]
    },
    {
        path: '/resumeshow',
        component: Resumeshow
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }


]

const router = new VueRouter({
    //配置路由和组件的关系
    routes,
    mode: 'history'
})
//3.将router对象传入到vue实例
export default router