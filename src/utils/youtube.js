import { getExternal } from '../core/httpClient'
let player

export function onYouTubeIframeAPIReady (playlist) {
  player = new YT.Player('player', {
    height: '390',
    width: '800',
    playerVars: {
      'autoplay': 0,
      'controls': 1,
      'playlist': playlist
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })
}

export function onPlayerReady () {
  // event.target.playVideo()
}

export function onPlayerStateChange (event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000)
    done = true
  }
}

export function loadPlaylist (id) {
  player.loadPlaylist(id)
}


export function stopVideo () {
  player.stopVideo()
}

export function getList (id) {
  return getExternal(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${id}&key=AIzaSyCaV2nbcGIcsPGsjwWjFPFMhHeTsko9eeA&maxResults=50`)
    .then(res => res.items.map(video => video.contentDetails.videoId).join(','))
    .catch(err => console.log(err))
}

export default {
  loadPlaylist,
  onYouTubeIframeAPIReady,
  getList
}
