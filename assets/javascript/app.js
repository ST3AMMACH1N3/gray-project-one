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

////Countdown to next launch////
////////////////////////////////
function countdownClock(snap) {
    var launchTime = snap.launch_date_unix
    //Convert current timestamp to unix time
    var currentTimeConverted = moment().format("X")
    console.log("current time in unix: " + currentTimeConverted)
    //Convert launch date/time into unix time
    console.log("next launch time: " + launchTime)
    //Calculate difference between launch and current unix time
    var timeRemaining = (launchTime - currentTimeConverted) * 1000
    console.log(timeRemaining)
    //Convert difference to format of number of days/hours/minutes/seconds remaining
    //Set interval to update coundown by one second
    setInterval(function () {
        timeRemaining = moment.duration(timeRemaining - 1000)
        moment(timeRemaining).format("DD:HH:mm:ss")
        $(".launch-count").text(timeRemaining.days() + ":" + timeRemaining.hours() + ":" + timeRemaining.minutes() + ":" + timeRemaining.seconds())
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

function onPlayerReady(event) {
    event.target.playVideo()
    $("#player").parent().parent().css("margin-left", "0").css("margin-right", "0")
    $("#player").parent().css("position", "relative").css("padding-top", "25px").css("padding-bottom", "56.25%").css("height", "0")
    $("#player").css("display", "flex").css("width", "100%").css("height", "100%").css("position", "absolute").css("top", "0").css("left", "0")
}

function onPlayerStateChange(event) {
    logTheState(event.data)
}

function logTheState(state) {
    for(var key in YT.PlayerState) {
        if (YT.PlayerState[key] == state) {
            console.log(key);
        }
    }
}