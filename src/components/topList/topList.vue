<template>
	<transition name="slide">
		<music-list  :title="title"  :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
	</transition>
</template>

<script>
	import musicList from "components/music-list/music-list"
	import {getMusicList} from "api/rank"
	import {ERR_OK }from "api/config"
	import {createsongs} from "common/js/song"
	import {mapGetters} from "vuex"
	export default{
		
        data(){
        	return{
        		songs:[],
        		rank:true
        		
        	}
        	
        },
        computed:{
			...mapGetters([
			  	 "topList",
			  	]),
			title(){
			    return this.topList.topTitle
	          },
	        bgImage(){
	        	return this.topList.picUrl
	        }
        },
		
		created(){
			this._getMusicList()
		},
		methods:{
		  _getMusicList(){
		  	if(!this.topList.id){
		  		this.$router.push({
		  			path:'/rank'
		  		})
		  	}
		  	getMusicList(this.topList.id).then((res)=>{
				if(res.code===ERR_OK){
				//	console.log(res.songlist.slice(0,100))
				this.songs=this._normalizeSong(res.songlist.slice(0,100))
				console.log(this.songs)
				}
			 })
		  },
		  _normalizeSong(list){
		  	
		  	 let ret=[]
		  	 list.forEach((item)=>{
		  	// 	console.log(item)
		  	 	let musicData=item
		 // 	 	console.log(musicData)
		  	 	if(musicData.data.songid ){
		  	 		ret.push(createsongs(musicData.data))
		  	 	}
		  	 })
		  	 return ret
		  	 console.log(ret)
		  }
		 
		},
		components:{
			musicList
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.slide-enter-active,.slide-leave-active
	  transition:all 0.3s ease
	.slide-enter,.slide-leave-top
	  transform:translate3d(100%,0,0)  
</style>