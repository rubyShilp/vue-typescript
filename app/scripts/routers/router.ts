import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import login from './../components/login/login.vue';
Vue.use(VueRouter);
//路由页面切换的时候，保持页面在滚动顶部显示
const scrollBehavior=(to:any,from:any,savedPosition:any)=>{
    if(savedPosition){
        return savedPosition;
    }else{
        const position:any={};
        if (to.hash) {
            position.selector = to.hash
        }
        if (to.matched.some((m:any) => m.meta.scrollToTop)) {
            position.x = 0
            position.y = 0
        }
        return position
    }
}
// 定义路由
const loginRouter = [
    {path: '/', redirect: '/login'},
    {path: '/login',component: login,meta: { scrollToTop: true }}
];
const routes=[...loginRouter];
// 创建router实例
const router:VueRouter = new VueRouter({
    mode:'hash',
    base: __dirname,
    scrollBehavior,
    routes:routes,
});
//判断当前是否登录，则跳转相应的页面
router.beforeEach((to,form,next)=>{
    // 判断是否需要登录权限
    if(to.matched.some(res => res.meta.requireAuth)){
        // 判断是否登录
        next();
        // if(token()){
        //     next();
        // }else{
        //     next({
        //         path:'/login'
        //     })
        // }
    }else{
        next();
    }
})
export default router;