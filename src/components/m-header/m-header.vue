<template>
	<div class="header">
		<div class="icon1"></div>
		<div class="title">JeanHAOo music</div>
		<router-link to="/user" tag="div" class="mine">
			<div class="icon-mine"></div>
		</router-link>
	</div>
</template>

<script>
	
</script>

<style lang="stylus" >
   @import '~common/stylus/variable'
   @import '~common/stylus/mixin'
 /* @import  "~common/stylus/variable"
   @import   "~common/stylus/mixin"*/
  
	.header
	   position: relative;height: 44px;text-align: center; color: $color-theme;font-size: 0
	  .icon1
	       bg-image('logo');display: inline-block;vertical-align: top;margin-top: 6px;margin-right:9px;width: 30px;height: 32px;margin-right: 9px; background-size: 30px 32px
	  .title    
	      display: inline-block;vertical-align: top;line-height: 44px; font-size: $font-size-large
	  .mine
	      position:absolute;top:0;right:0;padding:12px 
	    .icon-mine
	      display:block;font-size:20px;color: #ffcd32; 
	      
	     
	  
</style>