import Vue from 'vue';
import App from './components/app.vue';
import stroe from './store/store';
import router from './routers/router';
new Vue({
    store:stroe,
    router:router,
    render: h => h(App)
}).$mount("#app");
