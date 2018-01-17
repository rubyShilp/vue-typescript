import {ActionTree,MutationTree} from 'vuex';
import {post} from './../../servers/httpServer';
interface State{

}
const state:State={
  
};

const actions:ActionTree<State, any>={
  login: async({},params:any)=>{
    let result=await post('/user/login.do',params);
    return result.data;
  }
};
const loginModule={
  namespaced:true,
  state:state,
  actions:actions
};
export default loginModule;