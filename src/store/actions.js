



import * as types from './mutation-types'
import {playMode} from "common/js/config"
import {shuffer} from "common/js/util"
import {insertHistorySearch ,deleteHistory,deletestroage,insertHistoryplay,insertFavorite,deleteFavorite} from "common/js/cache"

//使得当前播放歌曲的索引与这首歌本身的索引一致
function findIndex(list,song){
	return list.findIndex((item)=>{
    return item.id===song.id
    debugger
      console.log(item.id)
	})
}

export const selectplay = function({commit,state},{list,index}){
	   
		commit(types.SET_SEQUENCE_LIST,list);
		// 判断播放模式，提交打乱后的数组
	if(state.mode===playMode.random){
		debugger
  	let randomList=shuffer(list).slice()
		commit(types.SET_PLAYLIST,randomList);
		console.log(index)
	let	index=findIndex(randomList,list[index])
		console.log(index)
	}else{
	 commit(types.SET_PLAYLIST,list);
	}
    commit(types.SET_FULL_SCREEN ,true);
	commit(types.SET_CURRENT_INDEX ,index);
	commit(types.SET_PLAYING_STATE,true);
}

export const playRandom=function({commit,state},list){
	commit(types.SET_PLAY_MODE,playMode.random);
	commit(types.SET_SEQUENCE_LIST,list)
	let randomList=shuffer(list)
	commit(types.SET_PLAYLIST,randomList);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
	commit(types.SET_CURRENT_INDEX ,0);
}

export const insertSong=function({commit,state},song){
	//debugger
	let sequenceList=state.squenceList.slice()

	let playlist=state.playlist.slice()

	let currentIndex=state.currentIndex
	
	//记录当前歌曲
	let currentSong=playlist[currentIndex]
   //// 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex=findIndex(playlist,song)
    //因为插入歌曲所有索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex,0,song)
    // 判断这首歌曲是否包含在列表中
    if(fpIndex>-1){
    //在判断这首歌曲插入序号大于列表中的序号	
    	if(currentIndex>fpIndex){
    	 playlist.splice(fpIndex,1)	
    	 currentIndex--
    	}else{
    	 playlist.splice(fpIndex+1,1)
    	}
    }
     //顺序播放一样的逻辑
     let currentSIndex = findIndex(sequenceList, currentSong) + 1

	  let fsIndex = findIndex(sequenceList, song)
	
	  sequenceList.splice(currentSIndex, 0, song)
	
	  if (fsIndex > -1) {
	    if (currentSIndex > fsIndex) {
	      sequenceList.splice(fsIndex, 1)
	    } else {
	      sequenceList.splice(fsIndex + 1, 1)
	    }
	  }
	
	commit(types.SET_SEQUENCE_LIST,sequenceList)
	commit(types.SET_PLAYLIST,playlist)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
	commit(types.SET_CURRENT_INDEX ,currentIndex)
}

export const insetHistorySearch=function({state,commit},query){
	 //debugger
	commit(types.SET_HISTORY_SEARCH,insertHistorySearch(query))
}

export const deleteOne=function({state,commit},item){
	commit(types.SET_HISTORY_SEARCH,deleteHistory(item))
}

export const deleteAllstroage=function({state,commit}){
	commit(types.SET_HISTORY_SEARCH,deletestroage())
}

/*播放列表删除一首歌曲*/
 export const deleteSong=function({state,commit},song){
 	
    //传入当前歌曲为参数
 	let playList=state.playlist.slice()
 	let sequenceList=state.squenceList.slice()
 	let currentIndex=state.currentIndex
 	console.log(playList)
 	//查找索引并删除
 	let flIndex=findIndex(playList,song)
 	playList.splice(flIndex,1)
 	console.log(flIndex)
 	let seIndex=findIndex(sequenceList,song)
 	 console.log(seIndex)  //0
 	sequenceList.splice(seIndex,1)
 	if (currentIndex > flIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
 }
 //清空所有的本地储存数据
export const deleteAllList=function({commit,state}){
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_SEQUENCE_LIST, [])
}

//储存最近播放的歌曲到本地 
 export const historyPlaylist=function({commit ,state},song){
 	
 	console.log(song)
 	commit( types.SET_HISTORY_PLAY, insertHistoryplay(song))
 	
 }

//储存喜欢的歌曲到本地
 export const saveFavoritelist=function({commit},song){
 	commit(types.SET_FAVORITE_LIST,insertFavorite(song))
 }
 
 export const deleteFavoritelist=function({commit},song){
 	commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
 }









