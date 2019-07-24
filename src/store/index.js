import Vue from 'vue';
import VueX  from 'vuex';

Vue.use(VueX);

const store = new VueX.Store({
    state:{
        isLogin: false,
        user:''
    }
})

export default store