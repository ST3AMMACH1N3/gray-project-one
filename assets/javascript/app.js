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

//COUNTDOWN TO NEXT LAUNCH
//format date


//FUTURE LAUNCHES
//SpaceX API for Upcoming Launches

//Set up variables for future launches

//How many future launches do I want to show?

//Create an array of future launches
//Have a For Loop to cycle through future launches
//AJAX Call
var futureLaunchURL = "https://api.spacexdata.com/v2/launches/upcoming?pretty=true"
$.ajax({
    url: futureLaunchURL,
    method: "GET"
}).then(function(response){ 
    console.log("futureLaunchURL: " + futureLaunchURL);
    
    //store data from the AJAX request in the results variable
    var futureLaunches = response;
    console.log(futureLaunches)
    console.log(futureLaunches[0].launch_site.site_name_long)
    for (var i = 0; i < futureLaunches.length; i++) {
        //create and store a div tag in the future-launch-info div
        $("#future-launch-info").append("<table><tr><td><strong>Mission Name:</strong></td><td>" + futureLaunches[i].mission_name + "</td></tr>"
        + "<tr><td><strong>Launch Date:</strong></td><td>" + futureLaunches[i].launch_date_local + "</td></tr>"
        + "<tr><td><strong>Launch Site:</strong></td><td>" + futureLaunches[i].launch_site.site_name_long + "</td></tr>" +
        "<tr><td style='background-color:#333333; height: 10px; margin-left:-10px;'></td><td style='background-color:#333333; height: 10px; margin-right:-10px;'></td></tr></table>"
        )

 

     /*   var futureLaunch = $("<div>");
        futureLaunch.attr("flight-num", futureLaunches[i].flight_number)
        futureLaunch.attr("mission-name", futureLaunches[i].mission_name)
        futureLaunch.attr("launch-date", futureLaunches[i].launch_date_local)
        futureLaunch.attr("launch-site", futureLaunches[i].launch_site.site_name_long)
    console.log(futureLaunch["launch-site"])
    //$(".future-block").text(snap.rocket.first_stage.cores[0].block)
    //$(".future-site").text(snap.launch_site.site_name_long)
    //$(".future-land-veh").text(snap
.rocket.first_stage.cores[0].landing_vehicle)
//$("#future-launch-info").append(futureLaunches */
   }
  });
 



//Dynamically generate cards for future launches
////Countdown to next launch////
////////////////////////////////
//Convert current timestamp to unix time
var currentTimeConverted = moment().format("X")
console.log(currentTimeConverted)
//Convert launch date/time into unix time
//Calculate difference between launch and current unix time
//Convert difference to format of number of days/hours/minutes/seconds remaining
//Set interval to update coundown by one second
//If today is launch day update page every 5 minutes
////////////////////////////////
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

//Create a function that uses the youtube iframe api
createIframe();
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
