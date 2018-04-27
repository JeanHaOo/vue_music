<template>
	<div class="search">
		<div class="search_box_wrapper">
			<search-box ref="searchBox" @query="queryChange" placeholder="搜索歌曲、歌手"></search-box>
		</div>
		<!--热门搜索-->
		<div class="shortcut-wrapper" v-show="!query" >
		  <Scroll class="shortcut" :data="concatArr" ref="shortcut">
		  	<div>
			    <div class="hot-key">
			      <h1 class="title">热门搜索</h1>
			      <ul>
			      	<li class="item" v-for="item in hotKey" @click="hotKeyclick(item.k)">
			      		<span>{{item.k}}</span>
			      	</li>
			      </ul>
			    </div>
			    <div class="search-history" >
		            <h1 class="title">
		              <span class="text" >搜索历史</span>
		              <span  class="clear" @click="deleteAll">
		                <i class="icon-clear"></i>
		              </span>
		            </h1>
	            <searchList :historyData="historySearch" v-show="!query" @chooseItem="hotKeyclick" @deleted_p="deleteOne"></searchList> <!--点击的时候直接调用热门搜索关键词的到方法-->
	          </div>
          </div>
		  </Scroll>
		</div>
		<!--搜索结果-->
		<div class="search_result" v-show="query" >
			<suggest :query="query" @select="saveHistory" @scrollbeforestart="listenScroll" ></suggest>
		</div>
		<!--历史搜索记录-->
		<comfirm comfirm_text="是否清空搜索记录" v-show="flag" @cancled="cancled"  @confirmd="confirmd"></comfirm>
		<router-view></router-view>
		
	</div>
</template>

<script>
	import searchBox from "base/search-box/search-box"
	import suggest from "components/suggest/suggest"
	import {getHotkey} from "api/search"
	import {mapActions,mapGetters} from "vuex"
	import {ERR_OK} from "api/config"
	import searchList from "base/search-list/search-list"
	import comfirm from "base/comfirm/comfirm"
	import Scroll from "base/scroll/scroll"
	export default{
		
		created(){
			this._getHotkey()
			
		},
		data(){
			return {
				hotKey:[],
				query:"",
				flag:false
			}
		},
		computed:{
			...mapGetters([
				"historySearch"
			]),
			concatArr(){
				return this.hotKey.concat(this.historySearch)
			}
		},
		methods:{
			_getHotkey(){
			 getHotkey().then((res)=>{
			//	 	console.log(res)
				 	if(res.code===ERR_OK){
				 		this.hotKey=res.data.hotkey.slice(0,10)
				 	//	console.log(this.hotKey)
				 	}
			 })
			},
			//子组件input中值变化时候传递到父组件
			queryChange(newquery){
			 this.query=newquery
		//	console.log( this.query)
			},
			hotKeyclick(query){
			//	debugger
			   this.$refs.searchBox.setHotkey(query)
			},
			//用子组件的方法
			listenScroll(){
				this.$refs.searchBox.blur()
			},
			saveHistory(){
				this.insetHistorySearch(this.query)
			},
			deleteAll(){
				this.flag=true
			},
			cancled(){
				this.flag=false
			},
			confirmd(){
				
				this.deleteAllstroage()
				this.flag=false
			},
			...mapActions([
				"insetHistorySearch",
				"deleteOne",
				"deleteAllstroage"
				])
		},
		components:{
			searchBox,
			suggest,
			searchList,
			comfirm,
			Scroll
		}
	}
	
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    .search_box_wrapper
     margin:20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search_result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>