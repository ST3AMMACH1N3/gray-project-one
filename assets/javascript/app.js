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

$.ajax({
    url: "https://api.spacexdata.com/v2/launches/upcoming?pretty=true",
    method: "GET"
}).then(function(snap){
    
    $("#future-flight-num").text(snap.flight_number)
    $("#future-mission-name").text(snap.mission_name)
    $("#future-date").text(snap.launch_date_local)
    
    $("#future-block").text(snap.rocket.first_stage.cores[0].block)
    $("#future-site").text(snap.launch_site.site_name_long)
    $("#future-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)

  })
 



//Dynamically generate cards for future launches
//Create the variables for all of the pieces of the url we might want to change
//channelId
//part
//eventType
//type

//Ajax call to the youtube api
//Check if there is a livestream currently live
//If there is update the iframe

//Create a function that uses the youtube iframe api
