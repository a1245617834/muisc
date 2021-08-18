const user = {
    state: {
      cookie: '',
      userMsg: [],
      userId: '',
      userSongList: '',
      songListId: '',
      serachKey: '',
      avatarUrl: '',
    },
    getters: {
      cookie: state => {
        let cookie =state.cookie
        if (!cookie) {
          cookie = JSON.parse(window.sessionStorage.getItem('cookie') || null)
        }
        return cookie
      },
      avatarUrl: state => {
        let avatarUrl =state.avatarUrl
        if (!avatarUrl) {
          avatarUrl = JSON.parse(window.sessionStorage.getItem('avatarUrl') || null)
        }
        return avatarUrl
      },
      userMsg: state => {
        let userMsg =state.userMsg
        if (!userMsg) {
          userMsg = JSON.parse(window.sessionStorage.getItem('userMsg') || null)
        }
        return userMsg
      },
      userId: state => {
        let userId =state.userId
        if (!userId) {
          userId = JSON.parse(window.sessionStorage.getItem('userId') || null)
        }
        return userId
      },
      userSongList: state => {
        let userSongList =state.userSongList
        if (!userSongList) {
          userSongList = JSON.parse(window.sessionStorage.getItem('userSongList') || null)
        }
        return userSongList
      },
      songListId: state => {
        let songListId =state.songListId
        if (!songListId) {
          songListId = JSON.parse(window.sessionStorage.getItem('songListId') || null)
        }
        return songListId
      },
      serachKey: state => {
        let serachKey =state.serachKey
        if (!serachKey) {
          serachKey = JSON.parse(window.sessionStorage.getItem('serachKey') || null)
        }
        return serachKey
      },
    },
    mutations: {
      setCookie: (state, cookie) => {
        state.cookie = cookie
        window.sessionStorage.setItem('cookie', JSON.stringify(cookie))
      },
      setAvatarUrl: (state, avatarUrl) => {
        state.avatarUrl = avatarUrl
        window.sessionStorage.setItem('avatarUrl', JSON.stringify(avatarUrl))
      },
      setUserMsg: (state, userMsg) => {
        state.userMsg = userMsg
        window.sessionStorage.setItem('userMsg', JSON.stringify(userMsg))
      },
      setUserId: (state, userId) => {
        state.userId = userId
        window.sessionStorage.setItem('userId', JSON.stringify(userId))
      },
      setUserSongList: (state, userSongList) => {
        state.userSongList = userSongList
        window.sessionStorage.setItem('userSongList', JSON.stringify(userSongList))
      },
      setSongListId: (state, songListId) => {
        state.songListId = songListId
        window.sessionStorage.setItem('songListId', JSON.stringify(songListId))
      },
      setSeachKey: (state, serachKey) => {
        state.serachKey = serachKey
        window.sessionStorage.setItem('serachKey', JSON.stringify(serachKey))
      },
    },
    actions: {
    },
    modules: {
    }
  }
    
  export default user