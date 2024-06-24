import { createRouter,createWebHashHistory } from "vue-router";
import Emp from '../components/Emp.vue'

//路由映射
const routes=[
    {
        path:'/',
        redirect:'/emp'
    },
    {
        path:"/emp",
        component: Emp,
        name:'emp'
    },
    {
        path:'/add',
        component:()=>import("../components/EmpAdd.vue"),
        name:'empAdd'
    },
    {
        path:'/update/:empId',
        component:()=>import('../components/EmpEdit.vue'),
        name:'empEdit'
    }
];


const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
