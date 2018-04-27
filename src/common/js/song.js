//import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

/*export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}*/


export default class Song {
	 constructor ({id,mid,singer,name,album,/*播放时长*/duration,image,url,avatar}){  /*一些需要的信息*/
	 	  this.id=id
	 	  this.mid=mid
	 	  this.singer=singer
	 	  this.name=name
	 	  this.album=album
	 	  this.duration=duration
	 	  this.image=image
	 	  this.url=url
	 	  this.avatar=avatar
	 }
}
 
 export function createsongs(musicData) {
 	/*使用工厂方法返回实例更加简便*/
 	 return new Song ({
 	 	 id:musicData.songid,
 	 	 mid:musicData.songmid,
 	 	 singer:filterName(musicData.singer),
 	 	 name:musicData.songname,
 	 	 album:musicData.albumname,
 	 	 duration:musicData.interval,
 	 	 image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
 	 	 url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
 	 })
 }
 
 export function filterName(singerName){
 	  let ret=[]
 	  // 可能不止一个歌手演唱该歌曲
 	  if(!singerName){
 	  	return ""
 	  }
 	  singerName.forEach((item)=>{
 	  		ret.push(item.name)
 	  })
 	  return ret.join("/")
 }

