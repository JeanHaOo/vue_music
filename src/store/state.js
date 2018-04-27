import {playMode} from "common/js/config"
import {loadSearch ,loadHistoryplay ,loadFavorite} from "common/js/cache"
const state={
	singer:{},
	playing:false,  //播放状态
	fullScreen:false, //全屏
	playlist:[], //播放列表
	squenceList:[],//播放顺序
	mode:playMode.sequence, //播放模式 顺序 随机 单曲循环 。。。。。
	currentIndex:-1, //当前播放索引
	topList:[],
	historySearch:loadSearch(),  //搜索历史
	historyPlay:loadHistoryplay(), //播放历史
	favoriteList:loadFavorite() // 喜欢的歌曲
} 
export default state