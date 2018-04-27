<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
		<p class="no-result-text">{{message}}</p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				message:"抱歉，暂无搜索结果"
			}
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.no-result
	  position:absolute
	  bottom:3%
	  left:29%
	  .no-result-icon
	    width:172px
	    height:180px
	    background-image:url("no-result.png")
	    background-repeat:no-repeat
	  .no-result-text
	    text-align:center
	    font-size:16px 
	    margin-top:30px
	    color:#f0f0f0
	    
</style>