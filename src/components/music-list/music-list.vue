<template>
	
	<div class="music-list">
		<div class="back">
			<i class="icon-back" @click="goBack"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage">
			<div class="play-wrapper">
				<div class="play" ref="play" @click="playRandom">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
	<scroll :data="songs" @scroll="scroll" :probeType="probeType" :listenScroll="listenScroll" class="list" ref="list">
			<div class="song-list-wrapper">
				<song-list :songs="songs"  @select="selectItem" :rank="rank"></song-list>
			</div>
			<div class="loading-container" v-show="!songs.length">
				<loading></loading>
			</div>
   </scroll>
	</div>
</template>

<script>
	import scroll from "base/scroll/scroll"
	import songList from "base/song-list/song-list"
	import loading from "base/loading/loading"
	import {mapActions} from 'vuex'
	import {playlistMixin} from "common/js/mixin"
	
	const TITLEHEIGHT=40
	export default{
		 mixins: [playlistMixin],
		//初始化Y轴滚动的距离
		
		data(){
			return{
				scrollY:0
			}
		},
		props:{
			title:{
				type:String,
				default:''
			},
			bgImage:{
				type:String,
				default:''
			},
			songs:{
				type:Array,
				 default: function () {
				        return []
				    }
			},
			rank:{
				type:Boolean
			 
			}
		},
		computed:{
			bgStyle() {
            return `background-image:url(${this.bgImage})`
          }
		},
		created(){
			this.listenScroll=true
			this.probeType=3
			
		},
		mounted(){
			this.imageHeight=this.$refs.bgImage.clientHeight
			this.$refs.list.$el.style.top=this.imageHeight+"px"
			
		},
		methods:{
			//利用mixin来获取到底部的距离位置
			handlePlaylist(playlist){
				//console.log(playlist)
				const bottom=playlist.length>0 ? "60px" :""
				this.$refs.list.$el.style.bottom=bottom
			    this.$refs.list.refresh()
			},
			// 随机播放模式
			playRandom(){
              this.playRandom({
				  list:this.songs
			  })
			},
			//获取滚动的高度
			scroll(pos){
				this.scrollY=pos.y
		//		console.log(this.scrollY)
			},
			goBack(){
				this.$router.back()
			},
			 selectItem(item,index) {
			 	this.selectplay({
		        	list:this.songs,
		        	index:index
		        })
              },
          ...mapActions([
				 'selectplay',
				 "playRandom"
            ])
			/*...mapMutations({
			fullScreen :"SET_FULL_SCREEN"
			})*/
		},
		watch:{
			scrollY(newY){
			let scale=1
			/*设置缩放比例*/	
			const precent=Math.abs(newY/this.imageHeight)
			/*获取手机的高度尺寸*/
			let bodyClient=document.documentElement.clientHeight
			//console.log(bodyClient) //568
			this.$refs.layer.style.top=newY+"px"
		   
			//判断滚动的距离跟屏幕的高度-图片的高度以及title的高度
			let m=-bodyClient+(bodyClient-this.imageHeight+TITLEHEIGHT)
			//console.log(m) //-184
			//如果滚动的距离大于的话则固定在那
			if(newY<m){
				//console.log(111)
				//console.log(bodyClient-this.this.imageHeight+TITLEHEIGHT) //528
				console.log(m)  
			    this.$refs.bgImage.style.paddingTop = "0" + 'px'  // 设置panddingtop值
				this.$refs.bgImage.style.height=TITLEHEIGHT+"px"  //设置高度
				this.$refs.bgImage.style.zIndex=10
				this.$refs.play.style.display="none"     //随机播放按钮取消
			}else{
				 //恢复原来的样式
			 	this.$refs.bgImage.style.height=0      
				this.$refs.bgImage.style.paddingTop = "70%"
				this.$refs.bgImage.style.zIndex=0
				this.$refs.play.style.display="block"
			 }
			if(newY>0){
				/*下拉歌手图片放大*/
				 scale=1+precent
				 this.$refs.layer.style.top=newY+"px"
			//	this.$refs.layer.style.transform=`translate3d(0,${newY}px,0)`
			    this.$refs.bgImage.style.transform=`scale(${scale})`
			    this.$refs.bgImage.style.zIndex=10
			}
			//this.$refs.bgImage.style.zIndex=10
			}
		},
		components:{
			scroll,
			songList,
			loading
		},
	}
</script>

<style lang="stylus"  scoped rel="stylesheet/stylus" >
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
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
        font-size:30px
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            line-height:22px
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container 
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
     
     
    
  
  
  
  
</style>