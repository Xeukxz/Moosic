let searchResults = []

$(() => {

  // load youtube api
  setTimeout(() => {
    gapi.client.load('youtube', 'v3', () => {
      gapi.client.setApiKey('AIzaSy'+'CIM4EzN'+'qi1in22'+'f4Z3Ru'+'3iYvLa'+'Y8tc3bo') //AIzaSyC_aHKYFGGEZ_dShlVukoYmlR1ZufAIbzA
    })
  }, 1000)


  $('#search .input').on('change', async () => {

    $('#search .results').html('')

    searchResults = []

    if($('#search .input').val() == '') return

    let results: any = await getYoutubeResults()

    console.log(results)

    for(let video of results) {
      let song = await new Song().importFromYoutube(video)
      searchResults[song.youtubeID] = song
    }
    setSortByNone()
    showSongs(searchResults, {topBar: false, scrollCurrentSong: false, refresh: true})
    $('#queue').hide()
  })
})

function getYoutubeResults() {
  return new Promise((resolve, reject) => {
    let q = $('#search .input').val()
    let request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      type: 'video',
      topicId: '/m/04rlf',
      maxResults: 50
    })

    request.execute((response) => {
      resolve(response.result.items)
    })
  })
}