//SpaceX API for Next Launch
$.ajax({
    url: "https://api.spacexdata.com/v2/launches/next?pretty=true",
    method: "GET"
}).then(function (snap) {
    $("#next-flight-num").text(snap.flight_number)
    $("#next-mission-name").text(snap.mission_name)
    // Set up format for launch date
    var nextLaunchDate = snap.launch_date_local;
    var convDate = moment(nextLaunchDate).format("MMM DD, YYYY, HH:mm");
    console.log("When is the Launch Date: " + convDate)
    $("#next-date").text(convDate)
    //$("#next-date").text(snap.launch_date_local)
    $("#next-rocket-name").text(snap.rocket.rocket_name)
    $("#next-block").text(snap.rocket.first_stage.cores[0].block)
    $("#next-site").text(snap.launch_site.site_name_long)
    $("#next-land-veh").text(snap.rocket.first_stage.cores[0].landing_vehicle)
    if (snap.rocket.first_stage.cores[0].landing_vehicle === null) {
        $("#next-land-veh").text("null")
    }
    countdownClock(snap)
    setReminderMailer()
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
}).then(function (response) {
    console.log("futureLaunchURL: " + futureLaunchURL);

    //store data from the AJAX request in the results variable

    var futureLaunches = response;
    console.log(futureLaunches)
    console.log(futureLaunches[0].launch_site.site_name_long)
    var fLaunchDate = futureLaunches[0].launch_date_local;
    console.log("fLaunchDate: " + fLaunchDate);

    console.log("convDate: " + convDate);
    console.log("date: " + moment(futureLaunches[0].launch_date_local).format("MMM DD, YYYY"))

    for (var i = 1; i < futureLaunches.length; i++) {
        //create and store a div tag in the future-launch-info div
        var fLaunchDate = futureLaunches[i].launch_date_local;
        var convDate = moment(fLaunchDate).format("MMM DD, YYYY");
        $("#future-launch-info").append("<div class='card' ><div class='card-body' ><table><tr style='border-bottom: solid 1px #999;'><td class='align-top'; style='width:33%; min-width='100px;'><strong>Mission&nbsp;Name:</strong></td><td>" + futureLaunches[i].mission_name + "</td></tr>"
            + "<tr style='border-bottom: solid 1px #999;'><td><strong>Launch Date:</strong></td><td>" + convDate + "</td></tr>"
            + "<tr><td class='align-top'><strong>Launch Site:</strong></td><td style='line-height:18px'>" + futureLaunches[i].launch_site.site_name_long + "</td></tr></table></div></div>" +
            "<tr><td style='background-color:#333333; height: 10px; margin-left:-10px;'></td><td style='background-color:#333333; height: 10px; margin-right:-10px;'></td></tr></table>"
        )
    }
});
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
var timeRemaining
var checkTimer
var countDown
var launchTime

//Countdown to next launch
function countdownClock(snap) {

    //Get launch time from API
    launchTime = snap.launch_date_unix

    //Convert current timestamp to unix time (milliseconds)
    var currentTimeConverted = moment().format("X")

    //Calculate difference between launch and current unix time (milliseconds)
    timeRemaining = moment.duration((launchTime - currentTimeConverted) * 1000)
    // timeRemaining = moment.duration(60 * 1000 * 6)

    //Set interval to update coundown by one second
    countDown = setInterval(function () {

        //Update time remaining by decreasing one second
        timeRemaining = moment.duration(timeRemaining - 1000)
        var data = timeRemaining._data

        //If there is no time left clear the interval
        let shouldClear = true;
        for (var key in data) {
            if (data[key] > 0) {
                shouldClear = false;
                break;
            }
        }
        if (shouldClear) {
            clearInterval(countDown)
        }

        //Convert difference to format of number of days/hours/minutes/seconds remaining
        //timeLeft = moment(timeRemaining._data).format("DD:HH:mm:ss")
        var timeArray = [data.days, data.hours, data.minutes, data.seconds]
        var timeLeft = ""
        for (var i = 0; i < timeArray.length; i++) {
            timeLeft += checkConcat(timeArray[i])
            if (i !== timeArray.length - 1) {
                timeLeft += ":"
            }
        }

        function checkConcat(value) {
            if (value < 10) {
                return `0${value}`
            }
            return value
        }

        //Display updated time left to launch to page
        $(".launch-count").text(timeLeft)
    }, 1000)


    //If the launch is more than a day away check back in every day
    if (timeRemaining._data.days > 0) {
        checkTimer = setInterval(checkDaysRemaining, 1000 * 60 * 60 * 24) //Once a day
        console.log("Day timer is set")
    } else {
        //If the launch is today call checkDaysRemaining
        checkDaysRemaining()
    }
}

function checkDaysRemaining() {
    var daysLeft = timeRemaining._data.days
    console.log(`${daysLeft} days left`)
    //If there is less than one day create an interval to check every hour
    if (daysLeft < 1) {
        console.log("Hour timer is set")
        clearInterval(checkTimer)
        checkHoursRemaining()
        checkTimer = setInterval(checkHoursRemaining, 1000 * 60 * 60) //Once an hour
    }

}

function checkHoursRemaining() {
    var hoursLeft = timeRemaining._data.hours
    console.log(`${hoursLeft} hours left`)
    //If there is less than 2 hours left set up an interval to check every 5 minutes
    if (hoursLeft < 2) {
        console.log("Five minute timer is set")
        clearInterval(checkTimer);
        checkStream()
        checkTimer = setInterval(checkStream, 1000 * 60 * 5) //Once every 5 minutes
    }

}


//Create the variables for all of the pieces of the url we might want to change
//the video id of the live stream
var videoId
//where the player object is stored
var player

function checkStream() {
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
    //Ajax call to the youtube api
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=${part}&eventType=${eventType}&type=${type}&key=${youtubeAPI}`,
        method: "GET"
    }).then(function (snap) {
        //Check if there is a livestream currently live
        if (snap.items.length > 0) {
            //If there is update the iframe
            console.log("The stream is live!")
            clearInterval(checkTimer);
            videoId = snap.items[0].id.videoId
            createIframe()
        } else {
            console.log("The stream is not live.")
        }
    })
}


//Create a function that uses the youtube iframe api
function createIframe() {
    var tag = $("<script>").attr("src", "https://www.youtube.com/iframe_api")
    $("script").first().before(tag)

}

//Create a function that uses the youtube iframe api
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
    logState(event.data)
}

function logState(state) {
    for (var key in YT.PlayerState) {
        if (YT.PlayerState[key] == state) {
            console.log(key);
        }
    }
}

//Subscribe to emails
$("#submit").click(function (event) {
    event.preventDefault()

    //Take input from user to set name and email
    var name = $("#first-name").val().trim() + $("#last-name").val().trim()
    var email = $("#email").val().trim()

    //Send welcome email to new subscriber
    sendWelcome(name, email)

    //Create contact recipient for mailer campaigns
    addSubscriber(name, email)

    //Clear inputs
    $("#first-name").val("")
    $("#last-name").val("")
    $("#email").val("")
})

function setReminderMailer() {
    var sendAt = {
        send_at: launchTime - 86400
    }
    //API update schedule for livestream reminder mailer campaign
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.sendgrid.com/v3/campaigns/4012533/schedules",
        "method": "POST",
        "headers": {
            "authorization": "Bearer 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",
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(sendAt)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function sendWelcome(name, email) {
    // Object to send welcome email
    var welcomeEmail = {
        personalizations: [
            {
                to: [
                    {
                        email: email,
                        name: name
                    }
                ],
                subject: "Thanks for subscribing!"
            }
        ],
        from: {
            email: "SpaceXLaunchPadHost@gmail.com",
            name: "SpaceX Launch Pad"
        },
        content: [
            {
                type: "text/plain",
                value: "Thank you for becoming one of our subscribers! You will receive an email notification the day before the next SpaceX launch to check out the live stream."
            }
        ]
    }

    //POST to mailer
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.sendgrid.com/v3/campaigns/4013744/schedules/now",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sendGridAPI,
            "Cache-Control": "no-cache",
            "Postman-Token": "eb764eda-032e-4596-ade7-078d9630d176"
        },
        "processData": false,
        "data": JSON.stringify(welcomeEmail)
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    })
}

function addSubscriber(name, email) {
    //Object to create subscription contact
    var subscriber = [{
        email: email,
        first_name: name
    }]

    //POST to mailer
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.sendgrid.com/v3/contactdb/recipients",
        "method": "POST",
        "headers": {
            "authorization": "Bearer " + sendGridAPI,
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(subscriber)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}