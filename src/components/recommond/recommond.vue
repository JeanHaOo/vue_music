<template>
	<div class="recommend" ref='recommend'>
	<!--	<scroll ref="scroll" class="recommend-content">-->
		  <div>
		  	 <div v-if='this.Recommend.length' class="slider-wrapper" ref="sliderWrapper">
		     	<slider>
		  	 		<div v-for='item in Recommend'>
		  	 		  <a :href="item.linkUrl">
		  	 		    <img :src="item.picUrl" />
		  	 		  </a>
		  	 		</div>
		  	 	</slider>
		  	 </div>
		  </div>
		  <div class="radio" >
		  	    <h3>电台</h3>
				<ul>
					<li class="radio_list" v-for="item in Radiolist">
						<div class="img" >
							<img :src='item.picUrl'/>
							<div class="icon_play"></div>
						</div>
						<p class="text">{{item.Ftitle}}</p>
					</li>
				</ul>
			</div>
			<div class="hotsong">
				<h3>热门歌单</h3>
				<p class="client1"><a href="https://y.qq.com/">去客户端发现更多好音乐 ></a></p>
				<div class="client" ><a href="https://y.qq.com/?ADTAG=myqq&nomobile=1#type=index">查看电脑网页版</a></div>
			</div>
		  
		  <div class="loading-container" v-show="!Radiolist.length">
		  	<loading></loading>
		  </div>
		<!--</scroll>-->
	</div>
</template>

<script>
	 import slider from 'base/slider/slider'
	 import {getRecommend} from 'api/recommond.js'
	 import {ERR_OK} from 'api/config.js'
	 import loading from 'base/loading/loading'
	// import radio from "base/radio/radio"
	 export default{
	 	data(){
	 		return{
	 			Recommend:[],
	 			Radiolist:[]
	 		}
	 	},
	 	created(){
	 		this._getRecommend()
	 		this._getRadio()
	 	},
	 	methods:{
	 		_getRecommend(){
	 			getRecommend().then((res)=>{
	 				if(res.code===ERR_OK){
	 	           	 this.Recommend=res.data.slider
	 				}
	 			})
	 		},
	 	   _getRadio(){
	 	   	   getRecommend().then((res)=>{
	 				if(res.code===ERR_OK){
	 	           	 this.Radiolist=res.data.radioList
	 				}
	 			})
	 	   }
	 	},
	 	components:{
	 		slider,
	 		loading
	 		
	 	}
	 }
</script>

<style lang="stylus" scoped  rel='stylesheet/stylus'>
 
  @import "~common/stylus/variable"
	.recommend
	  position:fixed
	  width:100%
	  top:88px
	  bottom:0
	   .recommend-content
	    height:100%
	    overflow:hidden
	     .slider-wrapper
	       position:relative
	       width:100%;
	       overflow:hidden
	 .loading-container
        position: absolute
        width: 100%
        transform: translateY(100%)     
	 .radio
	   width:100%
	   padding:0 10px
	   h3
	    font-size: 16px
	    color: #f0f0f0
	    margin-bottom: 11px
	    font-weight: normal
	   .radio_list
	     width:46%
	     float:left
	     margin-right:10px
	     .img
	       position:relative
		    img
		     width:100%
		     height:100%
		    .icon_play
		      background:url("play_sprite.png")
		      position:absolute
		      right:0
		      bottom:0
		      width:24px
		      height:24px
		      background-size:cover
		      
	    .text
	      height: 36px
	      line-height: 18px
	      white-space: normal
	      align-items:stretch
	      word-wrap: break-word 
	      color:#f0f0f0
	      font-size:14px
	      margin-top:5px;
	 .hotsong
	   padding:0 10px
	   margin-top:15px
	   h3 
	    font-size: 16px
	    color: #f0f0f0
	    margin-bottom: 11px
	    font-weight: normal
	   .client1
	     height:40px
	     line-height:40px
	     text-align:center
	     font-size:12px
	   .client
	     text-align:center
	     font-size:14px
	         
</style>
