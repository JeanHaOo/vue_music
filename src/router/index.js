import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
/*import Recommond from 'components/recommond/recommond'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import topList from "components/topList/topList" */
Vue.use(Router)
//异步加载页面
 const Recommond= (resolve) =>{
 	import("components/recommond/recommond").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
 
 const Singer= (resolve) =>{
 	import("components/singer/singer").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
 
  const Rank= (resolve) =>{
 	import("components/rank/rank").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
  
   const Search= (resolve) =>{
 	import("components/search/search").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
   
    const singerDetail= (resolve) =>{
 	import("components/singer-detail/singer-detail").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
 
 
     const topList= (resolve) =>{
 	import("components/topList/topList").then((moundle)=>{
 		  resolve(moundle)
 	})
 }
     
     const User= (resolve) =>{
     	import ("components/user-center/user-center").then((moundle)=>{
     		resolve(moundle)
     	})
     }
 
 
export default new Router({
  routes: [
   
  	{
  	 path:'/',redirect:"/recommond"
  	},
    {
      path: '/recommond',
      component: Recommond
    },
    {
    	path:'/singer',
    	component:Singer,
    	children:[
	    	{
	    	  path: ":id",
	    		component:singerDetail
	    	}
    	]
    },
    {
    	path:'/rank',
    	component:Rank,
    	children:[
	    	{
	    		 path: ":id",
	    		component:topList
	    	}
    	]
    },
    {
    	path:'/search',
    	component:Search,
    	children:[
	    	{
	    	  path: ":id",
	    		component:singerDetail
	    	}
    	]
    },
    {
    	path:'/user',
    	component:User
    }
  ]
})
