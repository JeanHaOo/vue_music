<template>
   <transition name="slide" >	
	<div class="add_song" v-show="addsongFlag" @click.stop>
	  <div class="header">	
		<h1 class="title1">添加歌曲到列表</h1>
		<div class="close" @click.stop="close">
	  	<i class="icon icon-close"></i>
	  </div>
	  </div>
	  <div class='search-box-wrapper'>
		  <div class="search-box">
		  	  <search-box ref="searchBox" placeholder="搜索歌曲" @query="queryChange"></search-box>
		  </div>
      </div>		  
	  <div class="shortcut" v-show="!this.query">
	  	<switches :switchesItem="switchesItem" @switch="switchItem" :currentIndex="currentIndex" ></switches>
	  	<div class="list-wrapper" v-show="!this.query">
	  		<scroll class="list-scroll" ref="songList"  v-show="songList" :data="historyPlay" :refreshDelay="refreshDelay">
	  		  <div class="list-inner" >
	  			<song-list :songs="historyPlay" ></song-list>
	  		  </div>
	  		 </scroll> 
	  		 <scroll v-show="!songList" class="list-scroll" :data="historySearch" ref="searchList">
	  		  <div class="list-inner">
	  		     <searchList  :historyData="historySearch"  @chooseItem="hotKeyclick"  @deleted_p="deleteOne"></searchList> <!--点击的时候直接调用热门搜索关键词的到方法-->
	  		  </div>
	  		 </scroll>
	  	</div>
	  </div>
	  <suggest :query="query" v-show="this.query"></suggest>
	</div>
   </transition>
</template>

<script>
	import searchBox from "base/search-box/search-box"
	import switches from "base/switches/switches"
	import suggest from "components/suggest/suggest"
	import searchList from "base/search-list/search-list"
	import songList from "base/song-list/song-list"
	import scroll from "base/scroll/scroll"
    import {mapActions,mapGetters} from "vuex"
	export default{
		data(){
			return {
				addsongFlag:false,
				switchesItem:[ "最近播放","搜索历史"],
				query:"",
				songList:true,
				currentIndex:0,
				refreshDelay:120
			}
		},
	    computed:{
	    	...mapGetters([
	    		"historySearch",
	    		"historyPlay"
	    	]),
	  },   
		methods:{
			queryChange(newquery){
				this.query=newquery
			},
			//点击选项
			switchItem(index){
				//不久到这了么 对啊 就是对应的这里的事件
				//你是不是yao点击当前的然后有样式? 是啊 点击当前的添加class ｃlass 叫什么　
			 this.currentIndex=index
			   setTimeout(()=>{
			    if(index===0){
				    this.songList=true
				    this.$refs.songList.refresh()
				}else{
					this.songList=false
					this.$refs.searchList.refresh()
					}
			   },20)
					
			},
			open(){
				this.addsongFlag=true
			},
			close(){
				this.addsongFlag=false
			},
			hotKeyclick(query){
			//	debugger
			   this.$refs.searchBox.setHotkey(query)
			},
			...mapActions([
				"historyPlaylist",
				"deleteOne"
			])
		},
		components:{
			searchBox,
			switches,
			suggest,
			searchList,
			songList,
			scroll
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
   .add_song
     position:fixed
     top:0
     bottom:0
     width:100%
     z-index:100
     background: #222
     &.slide-enter-active,.slide-leave-active
        transition: all 0.3s
     &.slide-enter,.slide-leave-to
       transform:translate3d(100%,0,0)
     .header
       position:relative
       height:44px
       text-align:center
       .title1
         line-height:44px
         font-size: $font-size-large
         color: $color-text
        .close
          position:absolute
          top:0
          right:8px
          .icon-close
            display:block
            padding:12px
            font-size:20px
            color: $color-theme    
     .search-box-wrapper
      margin: 20px
     .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>