<template>
  <scroll class="suggest" 
  	      :data="result" 
  	      :pullup="pullup"
  	      @scrollToEnd="searchMore"
  	       ref="suggest"
  	      :beforeScroll="scrollBefore"
  	      @beforeScroll="scrollBeforeStart"
  	      >
		<ul class="suggest-list" >
			<li class="suggest-item" v-for="item in result"  @click="selectItem(item)">
				<div class="icon" :class="getIcon(item)">
					<i></i>
				</div>
				<div class="name">
					<p class="text" v-html="getSongname(item)"></p>
				</div>
			</li>
			<div class="loading-container" v-show="hasMore">
				<loading></loading>
			</div>
		</ul>
		<div class="no-result-wrapper" v-show="!this.result.length">
			<no-result ></no-result>
		</div>
		
	</scroll>
</template>

<script>
	import {search} from "api/search"
	import {ERR_OK} from "api/config"
	import {filterName} from 'common/js/song'
	import scroll from "base/scroll/scroll"
	import loading from "base/loading/loading"
	import {mapMutations,mapActions} from "vuex"
	import noResult from "base/no-result/no-result" 
	import song from "common/js/song"

	
	const perpage=20
	const TYPE_SINGER="singer"
	export default{
		props:{
			//传入的搜索框中的
			query:{
			  type:String,
			  default:""
			},
			//是否显示第一行的歌手
			showSinger:{
				type:Boolean,
				default:true
			},
			// 设置上拉刷新为true
			pullup:{
				type:Boolean,
				default:true 
			}
		},
		
		data(){
			return{
				result:[],  //接口数据储存在result
				page:1,//当前page
				hasMore:true,
				scrollBefore:true
			}
		},
		created(){
		  this._getSearchresult()
		},
		//观测query的变化值然后调用搜索接口函数
		 watch: {
	      query(newQuery) {
	        this._getSearchresult(newQuery)
         }
      },
		methods:{
			//向父级派发个事件
			scrollBeforeStart(){
				this.$emit("scrollbeforestart")
			},
			selectItem(item){
			//	console.log(item)
				//点击选择搜索的歌曲或者演唱者
				if(item.type===TYPE_SINGER){
					//console.log(item)
					const singer= new song({
					 mid:item.singermid,
					 name:item.singer.name,
					 id:item.singerid,
					 avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singermid}.jpg?max_age=2592000`
			     })
					 this.setSinger(singer)
					 this.$router.push({
					 	 path:`/search/${singer.mid}`
					 })
				}else{
					//debugger
					item=new song({
						id:item.songid,
				 	  mid:item.songmid,
				 	  singer:item.singer.name,
				 	  name:item.songname,
				 	  album:item.albumname,
				 	  duration:item.interval,
				 	  image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
 	 	        url: `http://ws.stream.qqmusic.qq.com/${item.songid}.m4a?fromtag=46`
				 	 })
						this.insertSong(item)
				}
			
				this.$emit("select",item)
			},
			//获取class
			getIcon(item){
				if(item.type===TYPE_SINGER){
					return  "icon-mine"
				}else{
					return  "icon-music"
				}
			},
			//获取歌曲名跟演唱者
			getSongname(item){
				if(item.type===TYPE_SINGER){
					return item.singername
				}else{
					return `${item.songname}-${filterName(item.singer)}`
				 }
				},
			//调用这个搜索接口并传入参数
			_getSearchresult(){
				 this.hasMore=true
				 this.page = 1
				 if(this.query){
				 	this.$refs.suggest.scrollTo(0,0)
				 }
				
				search(this.query, this.page, this.showSinger, perpage).then((res)=>{
					if(res.code===ERR_OK){
						this.result=this._normallize(res.data)
			//			console.log(this.result)
						this.checkMore(res.data)
					//	console.log(res.data)
					}
				})
			},
			//处理数据
			_normallize(data){
			//	console.log(data)
				let ret=[]
				//判断如果数据中有zidua字段则
				if(data.zhida && data.zhida.singerid){
					// 添加zhida中的所有数据并添加一个type用于判断是否为歌手
			  ret.push({...data.zhida,...{type:TYPE_SINGER}})
			 }
				//把ret与之前的数组连接
			 if (data.song) {
          ret = ret.concat(data.song.list)
        }
				 return ret
			},
			//检查是否还有更多
			 checkMore(data){
			 	let song=data.song
			 	if(song.curnum+perpage*this.page<song.totalnum){
			 		 this.hasMore=true
			 	}else{
			 		 this.hasMore=false
			 	}
			 },
			//上拉刷新获取更多页面
			searchMore(){
				console.log(11111)
				if(!this.hasMore){
					return 
				}
				this.page++
				
				search(this.query,this.page,this.showSinger, perpage).then((res)=>{
					 if(res.code===ERR_OK){
					 	 this.result=this.result.concat(this._normallize(res.data).splice(1))
					   console.log(this.result)
					   this.checkMore(res.data)
					  }
				})
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			...mapActions([
				"insertSong"
			])
		},
		components:{
			scroll,
			loading,
			noResult
		}
		
		
	}
	
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
	.suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        font-size: 14px
        color: $color-text-d
        background-image:none
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .loading-container
      position:absolute
      bottom:-65px 
      left:43%      
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>