import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from'./config.js'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
  
}

/*export function getRecommond() {
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
  
}*/

//{"code":0,"data":{"slider":[{"linkUrl":"http://y.qq.com/w/album.html?albummid=000gXPT90fGdWv","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000002D9Gfs1kDtPG.jpg","id":11647},{"linkUrl":"http://y.qq.com/w/album.html?albummid=004DNS354Z67Us","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001GlOmX2LEv8G.jpg","id":11621},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2167654&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000004F5uX307IGR0.jpg","id":11633},{"linkUrl":"https://y.qq.com/m/act/singchina2/index.html?ADTAG=jiaodiantu","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001HwBba2SAXOe.jpg","id":11570},{"linkUrl":"https://y.qq.com/m/act/Rapofchina/v2/index.html?ADTAG=jiaodiantu","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001P5sbt0YYnki.jpg","id":11532}],"radioList":[{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg","Ftitle":"一人一首招牌歌","radioid":307},{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg","Ftitle":"热歌","radioid":199}],"songList":[]}}
//{"code":0,"data":{"slider":[{"linkUrl":"http://y.qq.com/w/album.html?albummid=000gXPT90fGdWv","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000002D9Gfs1kDtPG.jpg","id":11647},{"linkUrl":"http://y.qq.com/w/album.html?albummid=004DNS354Z67Us","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001GlOmX2LEv8G.jpg","id":11621},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2167654&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000004F5uX307IGR0.jpg","id":11633},{"linkUrl":"https://y.qq.com/m/act/singchina2/index.html?ADTAG=jiaodiantu","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001HwBba2SAXOe.jpg","id":11570},{"linkUrl":"https://y.qq.com/m/act/Rapofchina/v2/index.html?ADTAG=jiaodiantu","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000001P5sbt0YYnki.jpg","id":11532}],"radioList":[{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg","Ftitle":"一人一首招牌歌","radioid":307},{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg","Ftitle":"热歌","radioid":199}],"songList":[]}}