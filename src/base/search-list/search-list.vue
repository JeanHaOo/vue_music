<template>
	<div class="search-list" >
	    <ul>
	      <li class="search-item"  v-for="item in historyData " @click="chooseHistory(item)">
	        <span class="text" >{{item}}</span>
	        <span class="icon" @click.stop="deleted(item)" >
	          <i class="icon-delete" ></i>
	        </span>
	      </li>
	    </ul>
  </div>
</template>

<script>
	export default{
		props:{
			historyData:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		methods:{
			chooseHistory(item){
				this.$emit("chooseItem",item)
			},
			deleted(item){
			//	debugger
				this.$emit("deleted_p",item)
			}
		}
		
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>