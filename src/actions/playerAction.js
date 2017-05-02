/**
 * @flow
 */
import searchMusic from "../utils/API/QQMusic/search"

export function setPlayMusicList(playMusicList: Array<Object>) {
  return {
    type: 'setPlayMusicList',
    playMusicList,
  }
}

export function setCurrentMusicInfo(musicInfo: Object) {
  return {
    type: 'setCurrentMusicInfo',
    musicInfo,
  }
}

export async function setSearchResultList(keywords: string) {
  const result = await searchMusic(keywords)
  const searchResultList = result.data.song.list
  return {
    type: 'setSearchResultList',
    searchResultList,
  }
}

export function setPlayerStatus(status: Object) {
  return {
    type: 'setPlayerStatus',
    status,
  }
}

export function playFindMusic(musicInfo: {
  songName: string,
  singer: string,
  id: number,
  imgSrc: string,
}) {
  const newCurrentMusicInfo = {
    ...musicInfo,
    fileSrc: `http://ws.stream.qqmusic.qq.com/${musicInfo.id}.m4a?fromtag=46`,
  }
  return [
    setCurrentMusicInfo(newCurrentMusicInfo),
    addSongToMusicList(newCurrentMusicInfo),
    setPlayerStatus({
      paused: false,
    })]
}

export function addSongToMusicList(musicInfo: Object) {
  return (dispatch: () => void, getState: () => void) => {
    const store = getState()
    const { player = {} } = store || {}
    const { musicList = [] } = player
    let newMusicList = musicList.concat([musicInfo])
    return dispatch(setPlayMusicList(newMusicList))
  }
}

export function playMusicList(id: number) {
  return (dispatch: () => void, getState: () => void) => {
    let newCurrentMusicInfo = {}
    const store = getState()
    const { player = {} } = store || {}
    const { musicList = [] } = player
    musicList.forEach((item, index) => {
      if ( item.id === id ) {
        newCurrentMusicInfo = item
      }
    })
    return [
      dispatch(setCurrentMusicInfo(newCurrentMusicInfo)),
      dispatch(setPlayerStatus({
        paused: false,
      }))]
  }
}

export function playMusicListNext() {
  return (dispatch: () => void, getState: () => void) => {
    let newCurrentMusicInfo = {}
    const store = getState()
    const { player = {} } = store || {}
    const { musicList = [], currentMusicInfo = {} } = player
    for (let i = 0; i < musicList.length; i++) {
      if ( musicList[i].id === currentMusicInfo.id ) {
        newCurrentMusicInfo = musicList[i + 1] || musicList[0]
      }
    }
    return [
      dispatch(setCurrentMusicInfo(newCurrentMusicInfo)),
      dispatch(setPlayerStatus({
        paused: false,
      }))]
  }
}

export function playMusicListPre() {
  return (dispatch: () => void, getState: () => void) => {
    let newCurrentMusicInfo = {}
    const store = getState()
    const { player = {} } = store || {}
    const { musicList = [], currentMusicInfo = {} } = player
    for (let i = 0; i < musicList.length; i++) {
      if ( musicList[i].id === currentMusicInfo.id ) {
        newCurrentMusicInfo = musicList[i - 1] || musicList[musicList.length - 1]
      }
    }
    return [
      dispatch(setCurrentMusicInfo(newCurrentMusicInfo)),
      dispatch(setPlayerStatus({
        paused: false,
      }))]
  }
}

export function pausedChange() {
  return (dispatch: () => void, getState: () => void) => {
    const store = getState()
    const { player = {} } = store || {}
    const { status } = player
    return dispatch(setPlayerStatus({
      paused: !status.paused,
    }))
  }
}

export function mutedChange() {
  return (dispatch: () => void, getState: () => void) => {
    const store = getState()
    const { player = {} } = store || {}
    const { status } = player
    return dispatch(setPlayerStatus({
      muted: !status.muted,
    }))
  }
}

export function volumeChange(value: number) {
  return setPlayerStatus({
    volume: value,
  })
}

export function setCurrentMusicDuration(value: number) {
  return setPlayerStatus({
    duration: value,
  })
}

export function setMusicCurrentTime(value: number) {
  return setPlayerStatus({
    currentTime: value,
  })
}

