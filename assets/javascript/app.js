//SpaceX API for Next Launch
$.ajax({
    url: "https://api.spacexdata.com/v2/launches/next?pretty=true",
    method: "GET"
}).then(function(snap){
    $("#next-flight-num").text(snap.flight_number)
    $("#next-mission-name").text(snap.mission_name)
    $("#next-date").text(snap.launch_date_local)
    launchTime = snap.launch_date_unix
    $("#next-rocket-name").text(snap.rocket.rocket_name)
    $("#next-block").text(snap.rocket.first_stage.cores[0].block)
    $("#next-site").text(snap.launch_site.site_name_long)
    $("#next-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)
})

////Countdown to next launch////
////////////////////////////////
//Convert current timestamp to unix time
var currentTimeConverted = moment().format("X")
console.log("current time in unix: " + currentTimeConverted)
//Convert launch date/time into unix time
var launchTime = ""
console.log("next launch time: " + launchTime)
//Calculate difference between launch and current unix time
var timeRemaining = launchTime - currentTimeConverted
console.log(timeRemaining)
//Convert difference to format of number of days/hours/minutes/seconds remaining
var timeRemainingConverted
//Set interval to update coundown by one second

//If today is launch day update page every 5 minutes
////////////////////////////////

//Create the variables for all of the pieces of the url we might want to change
//channelId
var channelId = "UCUuENVpVuzqpRsXWIDlpQTg"
//var channelId = "UCtI0Hodo5o5dUb67FeUjDeA"
//part
var part = "snippet"
//eventType
var eventType = "live"
//type
var type = "video"

//Ajax call to the youtube api
$.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=${part}&eventType=${eventType}&type=${type}&key=${youtubeAPI}`,
    method: "GET"
}).then(function(snap){
    //Check if there is a livestream currently live
    if (snap.items.length > 0) {
        //If there is update the iframe
        console.log("The stream is live!");
    } else {
        console.log("The stream is not live.")
    }
})


//Create a function that uses the youtube iframe api
function createIframe() {
    var tag = $("<script>").attr("src", "https://www.youtube.com/iframe_api");
    console.log($("script")[0])
}

createIframe();