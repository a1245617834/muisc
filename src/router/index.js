import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'



//top  no

//foot no 

//mian          
      //common
              //comment
import Comment from '../components/main/common/comment/Comment.vue'
      //common
              //detail
import AlbumDetail from '../components/main/common/detail/AlbumDetail.vue'
import MVPlayDetail from '../components/main/common/detail/MVPlayDetail.vue'
import PlayDetail from '../components/main/common/detail/PlayDetail.vue'
import RadioListDetail from '../components/main/common/detail/RadioListDetail.vue'
import RadioPlay from '../components/main/common/detail/RadioPlay.vue'
import SingerSongList from '../components/main/common/detail/SingerSongList.vue'
import SongListDetail from '../components/main/common/detail//SongListDetail.vue'
      //common
              //detail
import Search from '../components/main/common/search/Search.vue'
      //findMusic
import FindMusic from '../components/main/findMusic/FindMusic.vue'
      //findMusic
                 //newDisc
import NewMusicType from '../components/main/findMusic/newDisc/NewMusicType.vue'
      //findMusic
                 //radio
import RadioRecommend from '../components/main/findMusic/radio/RadioRecommend.vue'
      //findMusic
                 //rank 
      //findMusic
                 //recommend
import MusicRank from '../components/main/findMusic/recommend/MusicRank.vue'
import NewMusic from '../components/main/findMusic/recommend/NewMusic.vue'
import Radio from '../components/main/findMusic/recommend/Radio.vue'
import Recommend from '../components/main/findMusic/recommend/Recommend.vue'
import SingerList from '../components/main/findMusic/recommend/SingerList.vue'
import SongList from '../components/main/findMusic/recommend/SongList.vue'
      //findMusic
                 //singer

import SingerHotMusic  from '../components/main/findMusic/singer/SingerHotMusic.vue'
import SingerAllMusic  from '../components/main/findMusic/singer/SingerAllMusic.vue'
import SingerMV  from '../components/main/findMusic/singer/SingerMV.vue'
import SingerIntroduce  from '../components/main/findMusic/singer/SingerIntroduce.vue'
      //findMusic
                 //songList
//user
import MyMusic from '../components/user/myMusic/MyMusic.vue'
import HotTopic from '../components/user/hotTopic/HotTopic.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/main',
    children: [
      {
       path: '',
       component: FindMusic,
       redirect: '/recommend',
       children: [
         {
           path: '/Recommend',
           component: Recommend
         },
         {
           path: '/MusicRank',
           component: MusicRank,
         },
         {
           path: '/SongList',
           component: SongList
         },
         {
           path: '/Radio',
           component: Radio,
           redirect: '/RadioRecommend',
           children: [
             {
              path: '/RadioRecommend/',
              component: RadioRecommend
             }
           ]
         },
         {
           path: '/SingerList',
           component: SingerList,
         },
         {
           path: '/NewMusic',
           component: NewMusic,
           children: [
             {
               path: "",
               component: NewMusicType
             }
           ]
         },
         {
            path: '/SongListDetail/:id',
            component: SongListDetail
         },
         {
           path: '/RadioListDetail/:id',
           component: RadioListDetail
         },
         {
           path: '/SingerSongList/:id',
           component: SingerSongList,
           redirect: '/SingerHotMusic/:id',
           children: [
             {
               path: "/SingerHotMusic/:id",
               component: SingerHotMusic
             },
             {
              path: "/SingerAllMusic/:id",
              component: SingerAllMusic
            },
            {
              path: "/SingerMV/:id",
              component: SingerMV
            },
            {
              path: "/SingerIntroduce/:id",
              component: SingerIntroduce
            },
            
           ]
         },
         {
          path: "/AlbumDetail/:id",
          component: AlbumDetail
         },
         {
           path: "/PlayDetail/:id",
           component: PlayDetail,
           children: [
             {
               path: '',
               component: Comment
             }
           ]
         },
         {
          path: "/RadioPlay/:id",
          component: RadioPlay,
          children: [
            {
              path: '',
              component: Comment
            }
          ]
         },
         {
           path: "/MVPlayDetail/:id",
           component: MVPlayDetail,
           children:[
             {
               path: '',
               component: Comment
             }
           ]
         }
       ]
       
      },
      {
        path: '/MyMusic',
        component: MyMusic,
      },
      {
        path: '/HotTopic',
        component: HotTopic
      },
      {
        path: '/Search/:key',
        component: Search
      }
    ]
  }

]
const router = new VueRouter({
  routes
})

export default router
