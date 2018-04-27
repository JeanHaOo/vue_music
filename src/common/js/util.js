// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// export function shuffle(arr) {
//   let _arr = arr.slice()
//   for (let i = 0; i < _arr.length; i++) {
//     let j = getRandomInt(0, i)
//     let t = _arr[i]
//     _arr[i] = _arr[j]
//     _arr[j] = t
//   }
//   return _arr
// }

// export function debounce(func, delay) {
// let timer
// return function (...args) {
//   if (timer) {
//    clearTimeout(timer)
//   }
//   timer = setTimeout(() => {
//     func.apply(this, args)
//  }, delay)
//}
// }
    /*函数节流阀*/ 
   export function debounce(func,delay){
   	 let timer
   	 return function(...args){
   	 	if(timer){
   	 		clearTimeout(timer)
   	 	}
   	 	timer=setTimeout(()=>{
   	 	 func.apply(this,args)	
   	 	},delay)
   	 }
   }



 function getRandom(min,max){
     return Math.floor(Math.random()*(max-min+1)+min)  //随机数 在min跟max之间的随机数 包括max
 }

export function shuffer (arr){
 
  for(let i=0;i<arr.length;i++){
     let j=getRandom(0,i);
     let t=arr[i];
     
     arr[i]=arr[j];
     arr[j]=t 
   }
    return arr
    console.log(arr)
}


































