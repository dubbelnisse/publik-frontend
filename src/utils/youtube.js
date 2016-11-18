import { get } from '../core/httpClient'
// let player
// let done = false
// // const playlist = ['b_XKnkQZkOM', 'dnNt78eGjSM']
// // https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails
// // https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PL1EsZ9fQ6SqNWvt3RTDrc2TCiDRagtFIP&key=AIzaSyCaV2nbcGIcsPGsjwWjFPFMhHeTsko9eeA
// export function onYouTubeIframeAPIReady () {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '800',
//     playerVars: {
//       'autoplay': 0,
//       'controls': 1,
//       'playlist':['lsyzQiR-Mr4', 'Tkz6fPZErLg']
//     },
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   })
// }
//
// export function onPlayerReady () {
//   // event.target.loadPlaylist({
//   //   list: id,
//   //   index: 1,
//   //   startSeconds: 10,
//   //   suggestedQuality: 'small'
//   // })
//   // event.target.playVideo()
//   const requestOptions = {
//     playlistId: 'PL1EsZ9fQ6SqNWvt3RTDrc2TCiDRagtFIP',
//     part: 'snippet',
//     maxResults: 10
//   }
//
//   const request = gapi.client.youtube.playlistItems.list(requestOptions)
//   request.execute(function(response) {
//     // Only show pagination buttons if there is a pagination token for the
//     // next or previous page of results.
//     console.log('response', response)
//   })
// }
//
// export function onPlayerStateChange (event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000)
//     done = true
//   }
// }
// export function loadPlaylist (id) {
//   player.loadPlaylist(id)
// }
//
//
// export function stopVideo () {
//   player.stopVideo()
// }

export function getList (id) {
  console.log('ID', id)
  get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${id}&key=AIzaSyCaV2nbcGIcsPGsjwWjFPFMhHeTsko9eeA&maxResults=50`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default {
  getList
}
