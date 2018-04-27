<template>
	
		<div class="user-center">
		  <div class="back">
				<i class="icon-back" @click="back"></i>
		  </div>
		  <div class="switches-wrapper">
		  	<switches :switchesItem="switchesItem" @switch="switchclick" :currentIndex="currentIndex"></switches>
		  </div>
		  <div class="play-btn">
		  	<i class="icon-play"></i>
		  	<span class="text">随机播放</span>
		  </div>
		  <div class="list-wrapper">
		  	 <scroll class="list-scroll" ref="songList"  v-show="songList" :data="favoriteList" :refreshDelay="refreshDelay">
		  		 <div class="list-inner" >
		  			<song-list :songs="favoriteList" ></song-list>
		  		 </div>
	  		 </scroll> 
		  </div>
		  <div class="list-wrapper">
		  	 <scroll class="list-scroll" ref="songList"  v-show="!songList" :data="historyPlay" :refreshDelay="refreshDelay">
	  		  <div class="list-inner" >
	  			<song-list :songs="historyPlay" ></song-list>
	  		  </div>
	  		 </scroll>
		  </div>
		</div>
	
</template>

<script>
	import switches from "base/switches/switches"
	import songList from "base/song-list/song-list"
	import searchList from "base/search-list/search-list"
	import scroll from "base/scroll/scroll"
	import {mapGetters} from "vuex"
	
	export default{
		data(){
			return {
				switchesItem:["我喜欢的" ,"最近播放"],
				currentIndex:0,
				refreshDelay:120,
				songList:true
			}
		},
		computed:{
			...mapGetters([
				"favoriteList",
				"historyPlay"
			])
		},
		created(){
			
		},
		methods:{
			back(){
				this.$router.back()
			},
			switchclick(index){
			this.currentIndex=index
			if(index===0){
			 this.songList=true	
			}else{
			 this.songList=false		
			}
		    }
		},
		components:{
			switches,
			songList,
			scroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>