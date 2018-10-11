//SpaceX API for Next Launch
$.ajax({
    url: "https://api.spacexdata.com/v2/launches/next?pretty=true",
    method: "GET"
}).then(function(snap){
    $("#next-flight-num").text(snap.flight_number)
    $("#next-mission-name").text(snap.mission_name)
    $("#next-date").text(snap.launch_date_local)
    $("#next-rocket-name").text(snap.rocket.rocket_name)
    $("#next-block").text(snap.rocket.first_stage.cores[0].block)
    $("#next-site").text(snap.launch_site.site_name_long)
    $("#next-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)
})

//COUNTDOWN TO NEXT LAUNCH


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
        + "<tr><td><strong>Launch Site:</strong></td><td>" + futureLaunches[i].launch_site.site_name_long + "</td></tr></table><p></p>")

 


     /*   var futureLaunch = $("<div>");
        futureLaunch.attr("flight-num", futureLaunches[i].flight_number)
        futureLaunch.attr("mission-name", futureLaunches[i].mission_name)
        futureLaunch.attr("launch-date", futureLaunches[i].launch_date_local)
        futureLaunch.attr("launch-site", futureLaunches[i].launch_site.site_name_long)
    console.log(futureLaunch["launch-site"])
    //$(".future-block").text(snap.rocket.first_stage.cores[0].block)
    //$(".future-site").text(snap.launch_site.site_name_long)
    //$(".future-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)
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

//Create a function that uses the youtube iframe api
createIframe();
