import vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'
import createLogger from 'vuex/dist/logger' // 打印日志


vue.use(vuex)


const debug = process.env.NODE_ENV !== 'production'
export default new vuex.Store({
	actions,
	state,
	getters,
	mutations,
    strict:debug,
	plugins:debug ? [createLogger()] :[]
   
	
})






