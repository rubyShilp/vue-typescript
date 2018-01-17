import Vue from 'vue';
export default Vue.extend({
    data(){
        return{
            name:'张三'
        }
    },
    methods: {
        login(){
            let params={account:'LIUNIU',password:'1111qqqq'};
            this.$store.dispatch("loginModule/login",params).then((res:any)=>{
                console.log(res);
            })
        }
    }
})