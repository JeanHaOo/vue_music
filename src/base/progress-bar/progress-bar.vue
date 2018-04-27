<template>
	<div class="progress-bar" ref="progressBar" @click="progressbarClick">
		<div class="bar-inner">
			<div class="progress" ref="progress" ></div>
			<div class="progress-btn-wrapper"  ref="progressBtn"
				   @touchstart.prevent="progressTouchStart"
				   @touchmove.prevent="progressTouchMove"
				   @touchend.prevent="progressTouchEnd"
				>
				<div class="progress-btn" ></div>
			</div>
		</div>
	</div>
</template>

<script>
	const PROGRESS_BTN=16
	export default{
		
		props:{
			percent:{
				type:Number,
			    default:0
			}
		},
		created(){
			this.touch={}
		},
		methods:{
			progressTouchStart(e){
				//开始
				this.touch.initiated=true;
				//获取第一次点击的位置偏移
				this.touch.startX=e.touches[0].pageX
			//	console.log(this.touch.startX)
				//获取当前点击的left值 
				this.touch.left=this.$refs.progress.clientWidth
			//	console.log(this.touch.left)
			},
			progressTouchMove(e){
				if(!this.touch.initiated){
					return
				}
				//用第一次移动的值减去点击的值为两者的偏差值
			let	alta=e.touches[0].pageX-this.touch.startX
			//console.log(alta)
			    //偏移值为当前点击的left值加上偏差值
			    //只能在进度条的范围内进行拖动
			let	offsetWidth=Math.min(this.$refs.progressBar.clientWidth-PROGRESS_BTN,Math.max(0,this.touch.left+alta))
			//	console.log(offset)
				this._offset(offsetWidth)
			},
			progressTouchEnd(){
				this.initiated=false
				this.percentChange()
               
             },
			//封装一个函数 （进度条跟按钮的值）
			_offset(offsetWidth){
                this.$refs.progress.style.width=`${offsetWidth}px`
				this.$refs.progressBtn.style.transform=`translate3d(${offsetWidth}px,0,0)`  
				
			},
			//点击进度条上的按钮
			progressbarClick(e){
				//获取进度条的离窗口的左边的距离
			let rect=this.$refs.progressBar.getBoundingClientRect()
			//用点击的距离-left的值
			let offsetWidth=e.pageX-rect.left
			this._offset(offsetWidth)
			console.log(offsetWidth)
		//	console.log(rect)
			//this._offset(e.offsetX)
			//console.log(e.offsetX)
			//调用下面的方法使得对应进度
			this.percentChange()
			},
			//获取改变的进度条的比例
			percentChange(){
				//进度条的总长度
				 const barWidth=this.$refs.progressBar.clientWidth-PROGRESS_BTN 
				 //当前的进度条的长度/总进度条
				 const percent = this.$refs.progress.clientWidth / barWidth
				 //想父组件派发该事件
				this.$emit("percentChange",percent)
				},
          },
		watch:{
			percent(newPercent){
				//新进度条
				if(newPercent>0 &&  !this.initiated){
					const barWidth=this.$refs.progressBar.clientWidth-PROGRESS_BTN
					const offsetWidth=newPercent*barWidth
					this._offset(offsetWidth)
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>