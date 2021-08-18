const song = {
  state: {
    curId: '',
    commentId: { type: '',comId: ''},
    musicUrl: '',
    singerType: {area: '',type: ''},
    singerInType: '',
    songList: [],
  },
  getters: {
    curId: state => {
      let curId =state.curId
      if (!curId) {
        curId = JSON.parse(window.sessionStorage.getItem('curId') || null)
      }
      return curId
    },
    singerType: state => {
      let singerType =state.singerType
      if (!singerType) {
        singerType = JSON.parse(window.sessionStorage.getItem('singerType') || null)
      }
      return singerType
    },
    singerInType: state => {
      let singerInType =state.singerInType
      if (!singerInType) {
        singerInType = JSON.parse(window.sessionStorage.getItem('singerInType') || null)
      }
      return singerInType
    },
    commentId: state => {
      let commentId = state.commentId
      if (!commentId) {
        commentId = JSON.parse(window.sessionStorage.getItem('commentId') || null)
      }
      return commentId
    },
    musicUrl: state => {
      let musicUrl = state.musicUrl
      if (!musicUrl) {
        musicUrl = JSON.parse(window.sessionStorage.getItem('musicUrl') || null)
      }
      return musicUrl
    },
    songList: state => {
      let songList =state.songList
      if (!songList) {
        songList = JSON.parse(window.sessionStorage.getItem('songList') || null)
      }
      return songList
    },
  },
  mutations: {
    setCurId: (state,curId) =>{
      state.curId =  curId
      window.sessionStorage.setItem('curId', JSON.stringify(curId))
    },
    setList: (state,list) =>{
      state.list.push(list)
      window.sessionStorage.setItem('list', JSON.stringify(list))
    },
    setSingerType: (state, singerType) => {
      state.singerType.area = singerType[0]
      state.singerType.type = singerType[1]
      window.sessionStorage.setItem('singerType', JSON.stringify(singerType))
    },
    setSingerInitType: (state, singerInType) => {
      state.singerInType = singerInType
      window.sessionStorage.setItem('singerInType', JSON.stringify(singerInType))
    },
    setCommentId: (state, commentId) => {
      state.commentId.type = commentId[0]
      state.commentId.comId = commentId[1]
      window.sessionStorage.setItem('commentId', JSON.stringify(commentId))
    },
    setMusicUrl: (state, musicUrl) => {
      state.musicUrl = musicUrl
      window.sessionStorage.setItem('musicUrl', JSON.stringify(musicUrl))
    },
    addSongList: (state, songList) => {
      state.songList.push(songList)
      window.sessionStorage.setItem('songList', JSON.stringify(songList))
    },
    setSongList: (state, songList) => {
      state.songList = songList
      window.sessionStorage.setItem('songList', JSON.stringify(songList))
    }
  },
  actions: {
  },
  modules: {
  }
}
  
export default song