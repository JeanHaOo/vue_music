<template>
	<transition name="slide">
		<music-list :title="title" :bgImage="bgImage" :songs='songs' :rank="rank"></music-list>
	</transition>
</template>

<script>
	import musicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSingerdetail} from "api/singer.js"
	import {ERR_OK} from "api/config.js"
	import {createsongs} from 'common/js/song'
	export default{
		computed:{
			...mapGetters([
				"singer"
			]),
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
				
				console.log(this.singer.avatar)
			}
		},
		
		created(){
			this._getSingerdetail()
		},
		data(){
			return {
				songs:[],
				rank:false
			}
		},
		methods:{
		   _getSingerdetail(){
		   	 if(!this.singer.id){
		   	 	this.$router.push({
		   	 		path:'/singer'
		   	 	})
		   	}
			getSingerdetail(this.singer.mid).then((res)=>{
				 //通过jsonp返回数据内容
		             if(res.code===ERR_OK){
					 this.songs=this._normalizeSong(res.data.list)
				//	 console.log(this.songs)
					}
				})
			},
			 _normalizeSong(list) {
		             let ret = [ ]
				    list.forEach((item)=>{
				  
				    	let {musicData} = item
				    	
				    	if(musicData.songid && musicData.albumid){
				    		ret.push(createsongs(musicData))
				    	//	console.log(ret)
				    	}
				    })
				    return ret
               }
		},
		components:{
			musicList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "~common/stylus/variable"
	.singer-detail
	  position:fixed
	  top:0
	  left:0
	  right:0
	  bottom:0
	  z-index:100
	  background:$color-background
	  color:#fff
  .slide-enter-active,.slider-leave-active
     transition:all 0.3s
  .slide-enter,.slider-leave-to
     transform:translate3d(100%,0,0)   	  
</style>