<template>
	<div class="singer" ref="singer" >
		<listview  :singers='singers' @select="selectSinger" ref="list"></listview>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerlist} from 'api/singer.js'
	import {ERR_OK} from 'api/config.js'
	import listview from 'base/listview/listview'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from "common/js/mixin"
	
	const HOT_NAME='热门'
	export default{
		mixins: [playlistMixin],
		
		data(){
			return{
				singers:[],
			}
		},
		
		created(){
			 this._getSingerlist()
		},
		methods:{
			
			selectSinger(singer){
				//路由动态获取id
			this.$router.push({
			 path:`/singer/${singer.mid}`,
			 })
			 this.setSinger(singer)
			},
			//获取底部的高度
			handlePlaylist(playlist){
			
				//console.log(playlist)
				const bottom=playlist.length>0 ? "60px" :""
				this.$refs.singer.style.bottom=bottom
				this.$refs.list.refresh()
			},
			_getSingerlist(){
				getSingerlist().then((res)=>{
		      //	console.log(res)
					if(res.code===ERR_OK){
					this.singers=this._normalizeSinger(res.data.list)
			//		 console.log(this.singers)
					}
				})
		    },
			_normalizeSinger(singerlist){
				var map={
					hot:{
						// 热门
						title:HOT_NAME,
						//热门集合
						items:[]
				     }
				}
				singerlist.forEach((item,index)=>{
					//循环后获取前10个热门的歌手
					if(index<10){
					  map.hot.items.push({
					  	name:item.Fsinger_name,
					  	id:item.Fsinger_id,
					  	mid:item.Fsinger_mid,
					  	avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
					  })
				//	   console.log(map.hot.items)
					}
					//获取数据中的字母
					const key=item.Findex ;
				  //判断map里面是否有这个属性值 没有就把这属性赋值为一对象
					if(!map[key]){   
					   map[key]={
							title:key,
							items:[]
						}
					  }
						map[key].items.push({
						name:item.Fsinger_name,
					  	id:item.Fsinger_id,
					  	mid:item.Fsinger_mid,
					  	avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
					   })
					//	console.log(map.hot.items)
					
				})
				 // 为了得到有序列表，我们需要处理 map
			     let ret=[];
			     let hot=[];
			     for(let key in map){
			     	let val=map[key]
			   //  	console.log(val)
			     	if(val.title.match(/[a-zA-Z]/)){
			         ret.push(val)
			   //     console.log(ret)
			     	}else if(val.title===HOT_NAME){
			     	hot.push(val)
			   //  	console.log(hot)
			     	}
			     }
			     ret.sort((a,b)=>{
			     return	a.title.charCodeAt(0)-b.title.charCodeAt(0)
			     })
			   return hot.concat(ret)
			},
			...mapMutations({
				setSinger:"SET_SINGER"
			})
			
		},
		components:{
			listview
		}
	}
	
</script>

<style scoped lang='stylus'  rel='stylesheet/stylus'>
   .singer
     position:fixed
     top:88px
     bottom:0
     width:100%	
</style>