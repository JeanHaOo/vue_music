<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot>
			</slot>
		</div>
	
		<div class="dots">
			<span class="dot" v-for='(item,index) in dots' :class="currentPageindex===index? 'active' : ''"></span>
		</div>
    </div>
</template>

<script>
	import {addClass} from 'common/js/dom'
	import BSscroll from 'better-scroll'
 export default{
 	
 	data(){
 		return{
 			dots:[], //初始化dots的数量
 			currentPageindex:0
 		}
 	},
 	props:{
 		loop:{
 			type:Boolean,
 			default:true
 		},
 		autoPlay:{
 			type:Boolean,
 			default:true
 		},
 		interval:{
 			type:Number,
 			default:4000
 		}
 	},
 	mounted(){
 	  setTimeout(()=>{
 	  	this._setSliderwidth();  //计算轮播的总宽度
 	  	this._initdots(); //定义焦点轮播图与轮播图片一致
 	  	this._initSlider(); //初始化betterscroll一些属性
 	   if(this.loop){
 	   	 this._interval(); // 自动轮播 
 	   }
 	  },20),
 	  window.addEventListener('resize',()=>{
 	  	if(!this.slider){
 	  		return
 	  	}
 	  	this._setSliderwidth();
 	  	this.slider.refresh()// 重新刷新页面
 	  })
     },
      activated() {
      if (this.autoPlay) {
        this._interval()
      }
    },
     deactivated(){
      clearTimeout(this.timer)
   },
    beforeDestroy(){
      clearTimeout(this.timer)
    },
 	methods:{
 	 _setSliderwidth(){
 	 	// 获取总共多少轮播图片
 	 	 this.children=this.$refs.sliderGroup.children
 	// 	  console.log(this.children.length)
 	 	// 获取一张图片的宽度
 	 	 let slider_width=this.$refs.slider.clientWidth;
 	 //	console.log(slider_width)
 	 	//设置变量总长度为0
 	    	let width_all=0
 	 	 for( let i=0;i<this.children.length;i++){
 	 	 	//给每个轮播图片加上样式
 	 	 	let child=this.children[i];
 	 	 	addClass(child,'slider-item')
 	 	 	child.style.width=slider_width+"px";
 	 	 	width_all+=slider_width
 	 	// 	console.log(width_all)
 	 	 }
 	 	     if(this.loop){
 	 	 	width_all+=2*slider_width  //如果循环要多加2张图片的宽度
 	 	// 	console.log(width_all)
 	 	 }
 	 	   //设置轮播图总宽度
 	 	    this.$refs.sliderGroup.style.width=width_all+'px'
 	 	 //   console.log(this.$refs.sliderGroup.style.width)
 	 	 
 	 	},
 	 
 	   _initSlider(){ //初始化better-scroll插件属性
 	   	  this.slider=new BSscroll(this.$refs.slider,{
 	   	  	scrollX:true,  //X轴方向滚动
 	   	  	scrollY:false, //Y轴方向滚动
 	   	  	momentum:false, //是否开启动画
 	   	    snap:{
 	   	    	loop:this.loop  // 无缝滚动
 	   	    },
 	   	    click:true,
 	   	  	snapThreshold:0.3,  //当滑动距离超过0.3后会滑向下一页
 	   	  	snapSpeed:400  // 滑动距离
 	   	  })
 	   	  this.slider.on('scrollEnd',()=>{  //轮播滚动到下一个页面结束
 	   	  	let pageIndex=this.slider.getCurrentPage().pageX //获取当前页面的index
 	   	  
 	   	     this.currentPageindex=pageIndex-1
 	   	//     console.log( this.currentPageindex)
 	   	    if (this.autoPlay) {
             this._interval()
           }
 	   	  })
 	   	 this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          //  this._interval();
          }
        })
 	   },
 	     _initdots(){  //初始化焦点图
 	   	this.dots=new Array(this.children.length) //使得轮播焦点跟图片数量一致
 	   },
 	   _interval(){ //自动播放
 	   	let pageIndex=this.currentPageindex+1;
 	   	
 	   	 if (this.loop) {
          pageIndex += 1
        //  console.log(pageIndex)
        }
 	   	 	this.timer = setTimeout(()=>{
 	   	 		
 	   		this.slider.goToPage(pageIndex,0,400)
 	   	},400)
 	   
 	    
 	   }
 	   
 	  }
 	}
 
</script>

<style lang='stylus' scoped rel="stylesheet/stylus" >
	 @import "~common/stylus/variable"
	 .slider
	   min-height:1px
	   .slider-group
	     position:relative
	     overflow:hidden
	     white-space:nowrap
	     .slider-item
	       float:left
	       box-sizing:border-box
	       overflow:hidden
	       text-align:center
	       a
	        display:block
	        width:100%
	        overflow:hidden
	        text-decoration:none
	       img
	         display:block
	         width:100%
	   .dots
	      position: relative
	      right: 0
	      left: 0
	      bottom: 13px
	      text-align: center
	      font-size: 0
	      .dot
	        display: inline-block
	        margin: 0 4px
	        width: 8px
	        height: 8px
	        border-radius: 50%
	        background: $color-text-l
	        &.active
	          width: 20px
	          border-radius: 5px
	          background: $color-text-ll
	  
</style>