
import * as types from './mutation-types'

const mutations={
	[types.SET_SINGER](state,singer){
		state.singer=singer
	},
	[types.SET_PLAYING_STATE](state,flag){
		state.playing=flag
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list){
		state.playlist=list
	},
	[types.SET_SEQUENCE_LIST](state,list){
		state.squenceList=list
	},
	[types.SET_PLAY_MODE](state,mode){
		
		state.mode=mode
	},
	[types.SET_CURRENT_INDEX](state,index){
		state.currentIndex=index
	},
	[types.SET_TOP_LIST](state,topList){
		state.topList=topList
	},
	[types.SET_HISTORY_SEARCH](state,history){
		state.historySearch=history
	},
	[types.SET_HISTORY_PLAY](state,history){
		state.historyPlay = history
	},
	[types.SET_FAVORITE_LIST](state,list){
		state.favoriteList= list
	}
	
}
 export default mutations
