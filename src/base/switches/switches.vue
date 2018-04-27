<template>
	<ul class="switches">
		<li class="switch-item" v-for="(item,index) in switchesItem" 
			@click="selectItem(index)"
			:class="getClass(index)"
			>
			<span>{{item}}</span>
		</li>
	</ul>
</template>

<script>
	
	export default{
		props:{
			switchesItem:{
				type:Array,
				default:[]
			},
			currentIndex:{
				type:Number,
			    default:0
			}
		},
		methods:{
			selectItem(index){
				//点击选项卡的时候派发给父级一个事件
			  this.$emit("switch",index)
			  //console.log(this.currentIndex)
			  //console.log(index)
			},
			getClass(index){
				if(this.currentIndex===index){
					return "active"
				}else{
					return ""
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text
</style>