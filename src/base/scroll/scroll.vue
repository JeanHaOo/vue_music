<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 120
      }
    },
    created() {
      setTimeout(() => {
        this._initScroll()
      }, 200)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
        
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
    //上拉刷新
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
//          	console.log(this.scroll.y) //-156
//          	console.log(this.scroll.maxScrollY + 50)//-106
              this.$emit('scrollToEnd')
              
            }
          })
        }
//       //上拉刷新
//     if(this.pullup){
//     	 this.scroll.on("scrollEnd",()=>{
//     	 	 if(this.scroll.y<(this.scroll.maxScrollY+50)){
//     	 	 	this.$emit("scrollToEnd")
//     	 	 }
//     	 })
//     }
        //滑动的时候阻止手机键盘弹出来
       if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
       
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
