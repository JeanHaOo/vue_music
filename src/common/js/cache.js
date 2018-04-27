/*import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}*/
import storage from "good-storage"
//搜索历史 播放历史 喜欢歌曲 对应的key
 const SEARCH_KEY='__search__'
 const MAXLENGTH=15
 
 const PLAY_KEY = '__play__'
 const MAX_HISTORY_PLAY=200
 
 const FAVORITE_KET="_favorite_"
 const MAX_FAVORITE_LIST=200
 
// const storage=window.localStorage 
 //接受4个参数 分别是储存的数组 储存的值 比较函数（当前数组是否有这个值），最大值
function insertArray(arr,query,compare,maxlength){
//	debugger
	const index=arr.findIndex(compare)
	//console.log(index)
	if(index===0){
		return 
	}
	if(index>-1){
		arr.splice(index,1)
	}
	arr.unshift(query)
	 if(maxlength && arr.length > maxlength){
	 	// 删除最后一个
	 	arr.pop()
	 }
	// console.log(arr)
}

export function insertHistorySearch (query){
//用h5本地储存api
	/*	debugger
		//默认第一次操作设置为空数组
		if(storage.length===0){
			storage.setItem(SEARCH_KEY,JSON.stringify([query]))
		}
	//以数组的形式获取储存的数据
	let searches=JSON.parse(storage.getItem(SEARCH_KEY))
	console.log(searches)
	//储存的值然后判断该值存在的逻辑
	 insertArray(searches,query,(item)=>{
		return item === query
	},MAXLENGTH)
	//把当前的储存的值存入本地储存中
	 storage.setItem(SEARCH_KEY,JSON.stringify(searches))
	 return searches*/
	 // 读取本地储存中的数据 没有就是空数组
	// debugger
	let storages=storage.get(SEARCH_KEY,[])
	insertArray(storages,query,(item)=>{
		 return query===item
	},MAXLENGTH)
	storage.set(SEARCH_KEY,storages)
	return storages
}
export function loadSearch(){
	//return JSON.parse(storage.getItem(SEARCH_KEY))
	return storage.get(SEARCH_KEY,[])
}


//删除单个历史记录
export function deleteHistory(query){
	debugger
	 /*   let storages=JSON.parse(storage.getItem(SEARCH_KEY))
	   let index=storages.findIndex((item)=>{
	    	  return item===query
	    })
	    if(index>-1){
	    	storages.splice(index,1)
	    }
	    //删除之后在设置删除后的本地数据
	   storage.setItem(SEARCH_KEY,JSON.stringify(storages))
	 return storages*/
	   let storages=storage.get(SEARCH_KEY,[])
	   let index=storages.findIndex((item)=>{
	   	return item===query
	   })
	   if(index>-1){
	   	storages.splice(index,1)
	   }
	storage.set(SEARCH_KEY,storages)
	return storages
}
//删除本地储存数据
export function deletestroage(){
	//debugger
	/* let storaged=storage.clear()
	     storage.getItem(SEARCH_KEY,JSON.stringify(storaged))
	 console.log(storaged)
	 return storaged*/
	let storages=storage.clear()
	     storage.set(SEARCH_KEY,storages)
	     
}

//历史播放的歌曲插入
export function insertHistoryplay (song){
	
	//console.log(song)
//	console.log(storage)
	
	/* if(storage.length===0){
		debugger
	 	storage.setItem(PLAY_KEY,JSON.stringify([song]))
	 }
	 let songs=JSON.parse(storage.getItem(PLAY_KEY))
	  console.log(typeof songs)
	 
	  //	debugger
	 insertArray(songs,song,(item) => {
	 	return song.id === item.id
  },MAX_HISTORY_PLAY)
    storage.setItem(PLAY_KEY,JSON.stringify(songs))
    return songs*/
  
   let storages=storage.get(PLAY_KEY,[])
   insertArray(storages,song,(item)=>{

   	   return item.id===song.id
   },MAX_HISTORY_PLAY)
   storage.set(PLAY_KEY,storages)
   return storages
}
// 保存当前的值
export function loadHistoryplay (){
return 	storage.get(PLAY_KEY,[])
}
//添加喜欢的歌曲
export function insertFavorite(song){
	 let storages=storage.get(FAVORITE_KET,[])
	 insertArray(storages,song,(item)=>{
	 	return item.id===song.id
	 },MAX_FAVORITE_LIST)
	 storage.set(FAVORITE_KET,storages)
	 return storages
}


//删除喜欢的歌曲
export function deleteFavorite(song){
	 let storages=storage.get(FAVORITE_KET,[])
	 let index=storages.findIndex((item)=>{
	 	return item.id===song.id
	 })
	   if(index>-1){
	   	storages.splice(index,1)
	   }
	   storage.set(FAVORITE_KET,storages)
	   return storages 
}

export function loadFavorite(){
	return storage.get(FAVORITE_KET,[])
}


