<template>
	<div class="tab">
		<router-link to='/recommond' tag='div' class="tab-item">
			<span class="tab-link">推荐</span>
		</router-link>
		<router-link to='/singer' tag='div' class="tab-item">
			<span class="tab-link">歌手</span>
		</router-link>
		<router-link to='/rank' tag='div' class="tab-item">
			<span class="tab-link">排行</span>
		</router-link>
		<router-link to='/search' tag='div' class="tab-item">
			<span class="tab-link">搜索</span>
		</router-link>
	</div>
</template>

<script>
	
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
@import "~common/stylus/clear"
 .tab
   height:44px;
   width:100%; 
   font-size: $font-size-medium;
   &:before
     clear()
   .tab-item
     width:24%;line-height:44px; color: $color-text-l;display:inline-block;text-align:center
   .router-link-active  .tab-link
     border-bottom:2px solid $color-theme;color:$color-theme;padding-bottom:8px;
</style>