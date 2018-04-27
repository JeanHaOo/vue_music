<template>
	<div class="player" >
	<div class="normal-player" v-show="fullScreen" >
		<div class="background" >
			<img :src="currentSong.image" width="100%" height="100%" />
		</div>
		<div class="top">
			<div class="back" @click="close">
				<i class="icon-back"></i>
			</div>
			<div class="title" v-html="currentSong.name"></div>
			<div class="subtitle" v-html="currentSong.singer"></div>
		</div>
		<div class="middle">
			<div class="middle-l">
				<div class="cd-wrapper" :class="circle">
					<div class="cd play" :class="circle">
						<img :src="currentSong.image" width="100%" height="100%" />
					</div>
				</div>
			</div>
			<div class="middle-r"></div>
		</div>
		<div class="bottom">
			<div class="dot-wrapper">
				<span class="dot active"></span>
				<span class="dot"></span>
			</div>
			<div class="progress-wrapper">
				<span class="time time-l">{{format(currentTime)}}</span>
				<div class="progress-bar-wrapper"> 
					<ProgressBar :percent="percent"  @percentChange="onProgressBarChange" ></ProgressBar>
				</div>
				<span class="time time-r">{{format(currentSong.duration)}}</span>
				<!--timeupdate事件 返回音频播放的位置(以秒记)-->
				<audio :src="currentSong.url" ref="audio" @canplay="ready"  @timeupdate="updateTime" @ended="end" ></audio>
			</div>
			<div class="operators">
				   <div class="icon i-left"  @click="changeMode">
	                 <i :class="iconMode" ></i>  <!--- 111111111111111111111111111 -->
	               </div>
	            <div class="icon i-left" >
	              <i @click="prev"   class="icon-prev"></i>
	            </div>
	            <div class="icon i-center">
	              <i :class="playIcon" @click="togglePlaying"></i>
	            </div>
	            <div class="icon i-right" >
	              <i @click="next"  class="icon-next"></i>
	            </div>
	            <div class="icon i-right i-right1">
	              <i  :class="getFavoriteIcon(currentSong)" @click.stop="toggleFavorite(currentSong)"></i>
	            </div>
            </div>
		</div>
	</div>
	<div class="mini-player" v-show="!fullScreen" @click="open">
		<div class="icon" :class="circle">
			<img :src="currentSong.image" width="40" height="40" />
		</div>
		<div class="text">
			<h2 class="name"  v-html="currentSong.name"></h2>
			<p class="desc" v-html="currentSong.singer"></p>
		</div>
		<div class="control">
			<progressCircle :radius="32" :percent="percent">
				<i :class="playIconmini" @click.stop="togglePlaying"></i>
			</progressCircle>
			
		</div>
		<div class="control"  @click.stop="showList">
			<i class="icon-playlist"></i>
		</div>
		<playlist ref="playlist"></playlist>
	</div>
	</div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from "vuex"
	import ProgressBar from "base/progress-bar/progress-bar"
	import progressCircle from "base/progress-circle/progress-circle"
    import {playMode} from "common/js/config"
    import {shuffer} from "common/js/util"
    import playlist from "components/playlist/playlist"
    import {playerMixin} from "common/js/mixin"
	
	export default{
		mixins: [playerMixin],
		data(){
			return{
				currentTime:0
			}
		},
		//vuex提供的语法糖果，接受一个数组
		computed:{
		 ...mapGetters([
	        'currentSong',
	        'fullScreen',
	        'playing',
	        "currentIndex", //当前播放歌曲的索引值
	          "playlist",
	          "mode",
	          "squenceList",
	          "favoriteList"
          ]),
       
         playIcon(){
         	return this.playing? 'icon-pause' :'icon-play'
         },
         playIconmini(){
         	return this.playing? "icon-pause-mini" : "icon-play-mini"
         },
         iconMode(){
          return this.mode===playMode.sequence ? "icon-sequence" :this.mode===playMode.random ? "icon-random" :"icon-loop"
         },
        circle(){
         	return this.playing? "play play" :"play pause"
         },
         percent(){
		  	return this.currentTime/ this.currentSong.duration
		  }
       },
		
		methods:{
      //改变播放模式 
      changeMode(){
        let mode=(this.mode+1)%3
        console.log(mode)
        this.setplayMode(mode)  
        let list_p = JSON.parse(JSON.stringify(this.playlist))  //深拷贝 不占内存 保留当前的状态
      // console.log(list_p)
        let list = null
        let list_s = JSON.parse(JSON.stringify(this.squenceList))
        if(mode===playMode.random){ //2
     //    console.log(mode)
            list=shuffer(list_p)   //随机顺序列表
          //播放随机后的歌曲
       //    console.log(list)
      }else{
           list=list_s
        //   console.log(list)
          }
          this.resetCurrentindex(list)
          this.setplayList(list)
     },
      //重置当前歌曲索引值  如果不重置之前的索引与歌曲的索引不一致 会导致报错
        resetCurrentindex(list){
         let index= list.findIndex((item)=>{
           return item.id===this.currentSong.id
          })
     //    console.log(index)
          this.setCurrentIndex(index)
        },
        //打开全屏播放器
          open(){
            this.setFullScreen(true)	
          },
           //关闭全屏播放器 ，小的播放器出现
          close(){
            this.setFullScreen(false)
          },
          //点击上一首歌曲
          prev(){
           	 let index=this.currentIndex-1
          // 	 console.log(index)
          	if(index===-1){
          		index=this.playlist.length-1
          	}
          	this.setCurrentIndex(index)
          	this.setPlayingState(true)
          },
           //点击下一首歌曲
          next(){
          	let index=this.currentIndex+1
          	if(index===this.playlist.length){
          		index=0
          	}
           
            this.setCurrentIndex(index)
            this.setPlayingState(true)
           },
       
         
           //歌曲播放结束
           end(){
             if(this.mode===playMode.loop){
               this.$refs.audio.currentTime=0
               this.$refs.audio.play()
              }else{
               this.next()
             }
           
           },
          ready(){
          	this.songReady=true
          	this.historyPlaylist(this.currentSong)
          },
          
         updateTime(e){
         	this.currentTime=e.target.currentTime
         },
         //把当前播放的秒数转化为分钟：秒的形式
         format(interval){
         	let inter=interval|0
         	//分钟向下取
         	const minuate=inter /60 | 0  
         	//求秒的余数
         	const second = this.pad (inter % 60 )
         	 //返回这种形式
         	return `${minuate}:${second}`
         },
          //把秒数的格式为 00 （两位数）
         pad(time){
         	// 获取时间的长度
         	let len=time.toString().length 
         	 //当时间长度小于2
         	while(len<2){
         		//前面+0
         	   time ="0"+time  
         	   //前面加了0之后长度为2后跳出
         	   len++  
         	//   console.log(len) //2
         	}
         	return time  //返回时间
         },
         
			...mapMutations({
			//修改全屏的状态
			setFullScreen: 'SET_FULL_SCREEN',
			//播放状态
			setPlayingState:"SET_PLAYING_STATE",
			//改变播放歌曲的索引值
		  setCurrentIndex:'SET_CURRENT_INDEX',
		   //改变播放的模式 三种模式
		  setplayMode:"SET_PLAY_MODE",
		  setplayList:"SET_PLAYLIST"
			}),
			...mapActions([
				"historyPlaylist",
			]),
		
		
		//点击中间的按钮（暂停、播放）改变起状态
		togglePlaying(){
			this.setPlayingState(!this.playing)
		},
		onProgressBarChange(percent){
        //定义当前播放的时间
       this.$refs.audio.currentTime = this.currentSong.duration * percent
       console.log(this.$refs.audio.currentTime)
      
        if(!this.playing){
          //如果是暂停的状态则就让其播放
          this.togglePlaying()
        }
      }	,
      //点击弹起播放列表
	    showList(){
	    	this.$refs.playlist.show()
	    }
	},
	    
		watch:{
				//获取当前的歌曲播放的状态
			playing(newplay){
				this.$nextTick(()=>{
				let audio=this.$refs.audio
				newplay ? audio.play() : audio.pause()	
				})
			},
			  //当前歌曲让其是播放的状态
			currentSong(){
				this.$nextTick(()=>{
					this.$refs.audio.play()
				})
				
			}
			
		},
		components:{
			ProgressBar,
			progressCircle,
			playlist
		}
		
		
	   
		
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 100%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              img
               width:100%
               height:100%
               border-radius:50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            background:none
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            margin-top: -5px;
            i
              font-size: 40px
          .i-right
            text-align: left
          .i-right1  
            margin-top:-5px
          .icon-favorite
            color: $color-sub-theme
            margin-top: 3px;
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        margin: 0 10px 0 20px
        background-image:none
        height:auto
        &.play
            animation: rotate 10s linear infinite
        &.pause
            animation-play-state: paused
         img
          border-radius: 50%
          
          
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-playlist
          font-size: 32px
          color: $color-theme-d
        .icon-play-mini, .icon-pause-mini
          font-size: 32px
          color: $color-theme-d
          position:absolute
          left:0
          top:0
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

</style>