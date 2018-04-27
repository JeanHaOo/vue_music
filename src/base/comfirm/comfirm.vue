<template>
	<div class="confirm">
		
		  <div class="confirm_content">
		  	<p class="confirm_text" v-html="comfirm_text"></p>
		      <span class="cancle_btn" @click="cancle">取消</span>
			  <span class="confirm_btn" @click="confirm">清空</span>
		  </div>
		
	</div>
</template>

<script>
	export default{
		props:{
			comfirm_text:{
				type:String,
				default:""
			}
		},
		methods:{
			cancle(){
				
				this.$emit("cancled")
			},
			confirm(){
				this.$emit("confirmd")
			}
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.confirm
	  position:fixed
	  z-index:999
	  width:100%
	  height:100%
	  background-color: rgba(0,0,0,.3)
	  left:0
	  top:0
	  right:0
	  bottom:0
	  .confirm_content
	    margin:310px auto
	    width:270px
	    height:103px
	    background:#333
	    border-radius:10px
	    .confirm_text
	     font-size:14px
	     color:#fafafa
	     padding:19px 15px
	     text-align:center
	     border-bottom:2px solid #000
	    .confirm_btn,.cancle_btn
	      display:inline-block
	      height:50px
	      line-height:50px
	      text-align:center
	      width:130px
	      color:#fff
	    .cancle_btn
	      border-right:1px solid #000
	       
	  
</style>