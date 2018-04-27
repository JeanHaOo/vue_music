/*import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
*/

import {mapGetters,mapActions} from "vuex"

export const playlistMixin={
	 computed:{
	 	...mapGetters([
	 		'playlist',
	 		
	 	])
	 },
	 mounted(){
	 	 	this.handlePlaylist(this.playlist)
	 	},
	 activated(){
	 			this.handlePlaylist(this.playlist)
	 	},
	 	watch:{
	 	
	 		handlePlaylist(newVal){
	 			this.handlePlaylist(newVal)
	 		}
	 	},
	 methods:{
	 	handlePlaylist(){
	 		throw new Error('component must implement handlePlaylist method')
	 	}
	 }
}

export const playerMixin={
	methods:{
	      /*   indexValue(song){
            //	debugger
           	  let index=this.favoriteList.findIndex((item)=>{
           	 	return item.id===song.id
           	 })
           	  return index
           },
           
           //点击喜欢的歌手-------------------------------------------------------------------------------------------------------
           toggleSong(song){
           //	debugger
             let index= this.indexValue(this.currentSong)
              console.log(song)
           	 if(index>-1){
           	 	// 有这首歌点击的时候就在喜欢的歌曲中删除 并且删除后index就没有了
           	 	this.deleteFavoritelist(this.currentSong)
           	 	index=-1
           	 }else{
           	 	this.saveFavoritelist(this.currentSong)
           	 	index=0
           	 }
           
           },
           //获取图标--------------------------------------------------
           getFavoriteIcon(song){
           let index=this.indexValue(this.currentSong)
           	//   console.log(song)
          	
           	    if(index>-1){
           	    	return 'icon-favorite'
           	    }else{
           	    	return "icon-not-favorite"
           	    }
           }*/
          computed:{
	          	...mapGetters([
	          		"favoriteList"
	          	])
          },
            toggleFavorite(song) {
          //    debugger
            	 //点击收藏
					      if (this.isFavorite(song)) {
					        this.deleteFavoritelist(song)
					      } else {
					        this.saveFavoritelist(song)
					      }
					    },
					  getFavoriteIcon(song) {
					  //	 console.log(song) 获取icon
					      if (this.isFavorite(song)) {
					        return 'icon-favorite'
					      }
					      return 'icon-not-favorite'
					    },
					  isFavorite(song) {
					      const index = this.favoriteList.findIndex((item) => {
					        return item.id === song.id
					      })
					      return index > -1
					    },
					    ...mapActions([
					    	"saveFavoritelist",
								"deleteFavoritelist"
					    ])
    }       
}































