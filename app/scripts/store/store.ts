import Vue from 'vue';
import Vuex,{Store} from 'vuex';
import modules from './../components/modules';
Vue.use(Vuex);
interface State{

}
const state:State={
  
}
const store:Store<any>=new Vuex.Store({
  state:state,
  modules: modules
})
export default store;