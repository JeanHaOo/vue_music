import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from'./config.js'

export function getSingerlist(){
	let url='https://szc.y.qq.com/v8/fcg-bin/v8.fcg?'
	let data=Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
        key:'all_all_all',
        pagesize:100,
        pagenum:1,
        platform: 'yqq'
        
	})
	return jsonp(url,data,options)
}
 
export function getSingerdetail(singerId) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?'
   const url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?"
   const options={
    param:'jsonpCallback'
  }	
  
  const data = Object.assign({}, commonParams, {
    singermid:singerId,
    platform:"h5page",
    hostUin: 0,
    needNewCode: 0,
    format:'jsonp',
     from:'h5',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    
  })
 
  return jsonp(url, data, options)
}







