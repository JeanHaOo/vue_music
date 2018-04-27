<template>
   <scroll class="listview" 
   	:listenScroll="listenScroll"
   	@scroll="scroll"
  	:singers="singers" 
   	ref="listview" 
    :probe-type="probeType"
   	>
    <ul v-if="this.singers.length">
     	<li class="list-group"  ref="listGroup"    v-for='groups in singers' >
     	  <h2 class='list-group-title'>{{groups.title}}</h2>
     	  <ul>
     	  	<li class="list-group-item" v-for="item in groups.items" @click="seletctItem(item)">
     	  		<img class='avatar' v-lazy="item.avatar"/>
     	  		<span class="name" >{{item.name}}</span>
     	  	</li>
     	  </ul>
     	 </li>
     </ul>
     <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"  @touchmove.stop.prevent="onShortcutTouchMove"  @touchend.stop>
     	<ul>
     		<li class='item' v-for="(item,index) in shortcut" :data-index="index" :class="{'current' : currentIndex===index}">{{item}}</li>
     	</ul>
     </div>
     <div class="list-fixed"  v-show="fixedTitle" ref="fixed">
     	<div class="fixed-title">{{fixedTitle}}</div>
     </div>
     
     <div class='loading-container'>
     </div>
     </scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom.js'
	
	const TITLEHEIGHT=18
	export default{
		props:{
			singers:{
				type:Array,
				default:[]
			}
		},
		
		data() {
	      return {
	        scrollY: -1,
	        currentIndex: 0,
	        diff: -1,
	       // listHeight:[]
         }
      },
		created(){
			 this.probeType = 3,
			//设置一个公共的变量使得点击跟移动的时候都能用到这个变量
			  this.listenScroll = true,
			  this.touch={},
			  this.listHeight=[]
		},
		mounted(){
			setTimeout(()=>{
				this._calculateHeight()
			  },200)
		},
		computed:{
			shortcut(){
				//返回当前标题的的第一个字母
				return this.singers.map((group)=>{
					return group.title.substr(0,1)
				})
			},
			//监测滚动停留在哪个区域该区域的title就固定在顶部
		  fixedTitle(){
		     if (this.scrollY > 0) {
		     return ""
		     }
		return  this.singers[this.currentIndex]? this.singers[this.currentIndex].title:''
		     console.log(this.singers[this.anchorIndex])
		  }
			
		},
		//向父组件派发一个select事件，并向其传递参数item
		methods:{
			seletctItem(item){
			 this.$emit('select',item)	
			 
			},
			//重新加载
			refresh(){
			  this.$refs.listview.refresh()
			},
			 //点击touch事件
			onShortcutTouchStart(e){
			  let anchorIndex=getData(e.target,'index')
		    	//console.log(anchorIndex)
			  //记录第一次点击的时候
			  let firstTouch=e.touches[0]
			  //记录当前点击的纵坐标距离
			  this.touch.y1=firstTouch.pageY
			  console.log(this.$refs.listGroup.length)
		//	   console.log(this.touch.y1)
		 //把第一次点击的index赋值给created的this.touch 后可以使得移动事件可以用
			  this.touch.anchorIndex=anchorIndex
			 
			  //滚动到当前索引的区块位置
		//	  this.scrollY=-this.listHeight[anchorIndex]
			this._scorllTo(anchorIndex)
			 console.log(anchorIndex)
			},
			//移动事件
			onShortcutTouchMove(e){
				//记录第一次滑动的时候
			    let firstTouch=e.touches[0]
			    //记录滑动的时候的纵坐标距离
			    this.touch.y2=firstTouch.pageY
		    	//console.log(this.touch.y2)
			    //用纵坐标距离的差值除以高度 向下取整 获取到经过了多少个字母
			    let delta=(this.touch.y2-this.touch.y1)/18 |0
			    // 用第一次点击时候的索引值加上偏移的字母数
			    let anchorIndex=parseInt(this.touch.anchorIndex)+delta
			  this._scorllTo(anchorIndex)
			},
			//滚动到当前索引
			_scorllTo(index){
				if(!index && index!==0 ){
					return 
					console.log(index)
				}else if(index<0){
					index=0
				}
				 this.scrollY = -this.listHeight[index]
			     this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
			},
			
			// 滚动的距离
			scroll(pos){
			  this.scrollY=pos.y	
		//	  console.log( this.scrollY)
			},
			//获取到各个group-item的高度
			 _calculateHeight () {
			 	this.listHeight = []
		        const list = this.$refs.listGroup
		//        console.log(list.length)
		      //  console.log(3)
		        let height = 0
		        this.listHeight.push(height)
		        for (let i = 0; i < list.length; i++) {
		          let item = list[i]
		          height += item.clientHeight
		          this.listHeight.push(height)
		        //  return listHeight
                }
	    },
	    //获取固定定位的title
	   },
		watch:{
	   scrollY(newY){
	   	let listHeight=this.listHeight
	   	
	   	//滚动分三部分，第一部分上拉的时候始终在第一个
	   	//第二部分的时候在中间
	   	//第三部分在下拉到最后一个的时候
	   	//当上拉的时候移动的值为正数
	   	if(newY>0){
	   		this.currentIndex=0;
	   	}
	   	
	   	for(let i=0;i<listHeight.length;i++){
	   		let height1=listHeight[i];
	     	let height2=listHeight[i+1]
	   		if(-newY>=height1 && -newY<height2){
	   			this.currentIndex=i
	   			//diff是第二个的顶部的距离+滚动的距离（负数）
	   			this.diff=height2+newY
	  // 			console.log(this.diff)
	   			return
	   		}
	   		this.currentIndex=listHeight.length-1
	   	}
	   },
	   diff(newVal){
	   	 //算出diff后跟title的高度进行比较，如果差值小于title的高度，则赋值的数为差值-title的高度
	      let fixTop=(newVal>0 && newVal<TITLEHEIGHT)? newVal-TITLEHEIGHT : 0
	     // this.fixTop=fixTop
	      this.$refs.fixed.style.transform=`translateY(${fixTop}px)`
	   }
	   
	},
		components:{
			Scroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 5%
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>