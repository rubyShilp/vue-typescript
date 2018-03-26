import Vue from 'vue';
import Component from 'vue-class-component'
@Component
export default class Login extends Vue{
    //初始化数据
    name='张三';
    login(){
        let params={account:'LIUNIU',password:'1111qqqq'};
        this.$store.dispatch("loginModule/login",params).then((res:any)=>{
            console.log(res);
        }) 
    }
}