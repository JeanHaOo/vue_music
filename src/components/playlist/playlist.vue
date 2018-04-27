<template>
	<div class="playlist" v-show="playlistFlag" @click.stop="hide" >
		<div class="list-wrapper" @click.stop>
			<div class="list-header">
				<h1 class="list_title">
					<i :class="getModeIcon" @click="changeMode"></i>
					<span class="text" v-html="getModeText"></span>
					<span class="clear" @click="deleteAll">
						<i class="icon-clear"></i>
					</span>
				</h1>
			</div>
			<scroll class="list-content" ref="list_content">
			  <transition-group tag="ul" class="list" name="list">
			  	<li :key="item.name" ref="listItem" v-for="(item,index) in squenceList" @click=selectSong(item,index)>
			  		<span class="current">
			  		 <i :class="getplayIcon(item)"></i>
			        </span>
			  		<span class="singname">{{item.name}}</span>
			  		<span class="delete" @click.stop="deleteOnes(item)">
			  			<i class="icon-delete"></i>
			  		</span>
			  		<span class="like" >
			  			<i :class="getFavoriteIcon(item)" @click.stop="toggleFavorite(item)"></i>
			  		</span>
			  	</li>
			  </transition-group>
			</scroll>
			<div class="list-operate" @click.stop="addSongclick">
				<i class="icon-add"></i>
				<span class="addlist">添加歌曲到队列</span>
			</div>
			<div class="list-close" @click="hide">关闭</div>
			<comfirm v-show="comfirmFlag" comfirm_text="是否清空数据" @cancled="cancled" @confirmd="confirmd"> </comfirm>
		</div>
		<add-song ref="addsong"></add-song>
	</div>
</template>

<script>
	import {mapMutations,mapGetters,mapActions} from "vuex"
	import {playMode} from "common/js/config"
	import scroll from "base/scroll/scroll"
	import comfirm from "base/comfirm/comfirm"
	import addSong from "components/add-song/add-song"
	import {playerMixin} from "common/js/mixin"
	export default{
		mixins: [playerMixin],
		data(){
			return{
				playlistFlag:false,
				comfirmFlag:false
			}
		},
		computed:{
			...mapGetters([
				"squenceList",
				"playlist",
				"currentIndex",
				"currentSong",
				"mode",
				"favoriteList"
			]),
			//图标
		getModeIcon(){
			/*if(this.mode===playMode.random){
				return "icon icon-random"
			}else if(this.mode===playMode.sequence){
				return "icon icon-sequence"
			}
			 return "icon icon-loop"*/
			return this.mode===playMode.random?"icon icon-random" : this.mode===playMode.loop ? "icon icon-loop" :"icon icon-sequence"
		 },
		 //文字
		 getModeText(){
		 	return this.mode===playMode.random?"随机播放" : this.mode===playMode.loop ? "单曲循环" :"顺序播放"
		 }
		},
		methods:{
			show(){
				this.playlistFlag=true
				setTimeout(()=>{
				this.$refs.list_content.refresh()	
				},20)
			},
			hide(){
				this.playlistFlag=false
			},
			//设置当前播放歌曲前面的图标
			getplayIcon(item){
				if(this.currentSong.id===item.id){
					return "icon-play"
				}
				return ""
			},
			deleteOnes(item){
				this.deleteSong(item)
				this.$refs.list_content.refresh()
				if(!this.squenceList.length){
					debugger
					this.hide()
				}
            },
			//选择播放当前歌曲
			selectSong(item,index){
				//判断当是随机播放的时候
				if(this.mode===playMode.random){
				let index=this.playlist.findIndex((song)=>{
			  	   return song.id === this.currentSong.id
			  })
			}
				
			  this.setCurrentIndex(index)
			  this.scrollToCurrent(item)
			  this.setPlayState(true)
		   },
		   //滚动到当前播放的歌曲中()
		   scrollToCurrent(currentSong){
		   	//找到当前播放歌曲的索引
		   	 let index=this.squenceList.findIndex((item)=>{
		   	 	 return item.id===currentSong.id
		   	 })
		   	
		   	this.$refs.list_content.scrollToElement(this.$refs.listItem[index],300)
		   },
		   //改变播放模式
		   changeMode(){
		   let mode=(this.mode+1)%3
		   this.setPlayMode(mode)
		   console.log(mode)
		   },
		   // 清空数据
		   deleteAll(){
		   	this.comfirmFlag=true
		   },
		   //取消清空
		   cancled(){
		   	this.comfirmFlag=false
		   },
		   //确认清空
		   confirmd(){
		   	this.deleteAllList()
		   	this.comfirmFlag=false
		   	this.playlistFlag=false
		   },
		   //点击添加歌曲到队列中
		   addSongclick(){
		   	this.$refs.addsong.open()
		   },
		   //**************************************************************************************
		 
		   
			...mapMutations({
			setCurrentIndex:"SET_CURRENT_INDEX",
			setPlayMode:'SET_PLAY_MODE',
			setPlayState:"SET_PLAYING_STATE"
		   }),
	     	...mapActions([
			"deleteSong",
			"deleteAllList",
			"saveFavoritelist",
			"deleteFavoritelist"
		  ]),
		},
		
		components:{
			scroll,
			comfirm,
			addSong
		}
		
	}
</script>
<style lang="stylus" scoped  rel="stylesheet/stylus">
	 @import "~common/stylus/variable"
     @import "~common/stylus/mixin"
     .playlist 
      {position: fixed
       left:0
       top:0
       bottom:0
       right:0
       z-index:666
       background:$color-background-d}
       .list-wrapper
        {position:absolute
        bottom:0
        left:0
        width:100%;
        background:#333}
        .list-header
         {width:100%;
         }
         .list_title
          {padding:20px 30px 10px 20px
          line-height:30px}
          .icon
           {font-size:30px
           margin-right:10px
           color:$color-theme-d}
          .text{
           font-size: $font-size-medium
           color: $color-text-l
           line-height: 30px
           vertical-align: top } 
          .clear
          {float:right
          font-size: $font-size-medium
          color: $color-text-d
          margin-right:10px}  
           
        .list-content
         {max-height:240px
         overflow:hidden
         padding:0 30px 0 20px}
          li
           {height:40px;
           line-height:40px}
           &.list-enter-active,.list-leave-active
             {transition:all 0.06s}
            .list-enter,.list-leave-to
             {height:0}
         .current
           {width: 20px;
           height:40px;
		   font-size: 12px;
		   color: rgba(255,205,49,.5);
		   float:left}
		 .singname 
		   {width:224px;
		   padding-left:10px
		   display:inline-block
		   text-overflow: ellipsis
  	       overflow: hidden
	       white-space: nowrap
	       font-size: 14px
	       color: $color-text-d} 
	     .like,.delete
	       {float:right;
	        width:32px;
	        height:33px;
	        text-align: center;
	        color: $color-theme}
	     .like
	       {margin-right:5px}  
        .list-operate
          {width:140px;
           height:30px;
           line-height:30px;
           border-radius:15px;
           text-align:center;
           margin:20px auto 
           border:1px solid #fff;
           color: $color-text-l}
           .icon-add
            {margin-right: 5px
            font-size: $font-size-small-s}
           .addlist
            {font-size:12px}
        .list-close
          {width:100%
          height:50px
          text-align:center
          line-height:50px
          background:#222
          font-size:16px;
          color: $color-text-l
          }    
           
          
           
           
	         
	       
	    
</style>
