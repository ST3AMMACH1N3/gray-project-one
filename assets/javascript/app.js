//SpaceX API for Next Launch
$.ajax({
    url: "https://api.spacexdata.com/v2/launches/next?pretty=true",
    method: "GET"
}).then(function (snap) {
    $("#next-flight-num").text(snap.flight_number)
    $("#next-mission-name").text(snap.mission_name)
    $("#next-date").text(snap.launch_date_local)
    $("#next-rocket-name").text(snap.rocket.rocket_name)
    $("#next-block").text(snap.rocket.first_stage.cores[0].block)
    $("#next-site").text(snap.launch_site.site_name_long)
    $("#next-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)
    countdownClock(snap)
})

//Countdown to next launch
function countdownClock(snap) {

    //Get launch time from API
    var launchTime = snap.launch_date_unix

    //Convert current timestamp to unix time (milliseconds)
    var currentTimeConverted = moment().format("X")

    //Calculate difference between launch and current unix time (milliseconds)
    var timeRemaining = (launchTime - currentTimeConverted) * 1000

    //Set interval to update coundown by one second
    setInterval(function () {

        //Update time remaining by decreasing one second
        timeRemaining = moment.duration(timeRemaining - 1000)

        //Convert difference to format of number of days/hours/minutes/seconds remaining
        timeLeft = moment(timeRemaining._data).format("DD:HH:mm:ss")

        //Display updated time left to launch to page
        $(".launch-count").text(timeLeft)
    }, 1000)

    //If today is launch day update page every 5 minutes
    ////////////////////////////////
}


//Create the variables for all of the pieces of the url we might want to change
//Spacex
//var channelId = "UCtI0Hodo5o5dUb67FeUjDeA"
//Nasa
var channelId = "UCLA_DiR1FfKNvjuUpBHmylQ"
//part
var part = "snippet"
//eventType
var eventType = "live"
//type
var type = "video"
//the video id of the live stream
var videoId
//where the player object is stored
var player

//Ajax call to the youtube api
$.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=${part}&eventType=${eventType}&type=${type}&key=${youtubeAPI}`,
    method: "GET"
}).then(function (snap) {
    //Check if there is a livestream currently live
    if (snap.items.length > 0) {
        //If there is update the iframe
        console.log("The stream is live!")
        videoId = snap.items[0].id.videoId
        createIframe()
    } else {
        console.log("The stream is not live.")
    }
})


//Create a function that uses the youtube iframe api
function createIframe() {
    var tag = $("<script>").attr("src", "https://www.youtube.com/iframe_api")
    $("script").first().before(tag)

}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

    event.target.playVideo()
    $("#player").css("display", "block").css("width", "100%")
    var height = $("#player").width() * 0.609
    height = `${height}px`
    $("#player").css("height", height)

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000)
    //     done = true
    // }
}