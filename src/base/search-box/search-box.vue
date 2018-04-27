<template>
	<div class="search-box">
		<i class="icon-search"></i>
		<input type="text" :placeholder="placeholder" class="box" v-model="query" ref="searchBox"  />
		<i class="icon-dismiss" @click="clear" v-show="query" ></i>
	</div>
</template>

<script>
	import {debounce} from "common/js/util"
	export default{
		props:{
			placeholder:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				query:""
			}
		},
		created(){
			//搜索框变化时，传递给父级
			this.$watch("query",debounce((newquery)=>{
				this.$emit("query",newquery)
			},500))
		},
		
		methods:{
			clear(){
				this.query=""
			},
			setHotkey(query){
				this.query=query
			},
			 blur(){
			 	this.$refs.searchBox.blur()
			 }
		}
		
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
	
</style>