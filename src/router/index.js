import VueRouter from "vue-router";
import Vue from 'vue'
//1.通过使用VUE.use()，安装插件

const Index = () => import('../views/index.vue')
const NormalInfo = () => import('../views/edit/editchild/NormalInfo.vue')
const SpecicalSkill = () => import('../views/edit/editchild/SpecicalSkill.vue')
const EditModule = () => import('../views/edit/edit_module.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        component: Index,
        children: [{
            path: '/edit_module',
            component: EditModule
        }, {
            path: '/normal_info',
            component: NormalInfo
        },
        {
            path: 'cinema_manage',
            component: SpecicalSkill
        }

        ]
    }

]

const router = new VueRouter({
    //配置路由和组件的关系
    routes,
    mode: 'history'
})
//3.将router对象传入到vue实例
export default router