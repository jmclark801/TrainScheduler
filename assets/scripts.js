var trainName = ""
var destination = ""
var firstTrainTime = ""
var frequency = ""

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMH7bn7UpAiOXJI3Lpwy6eE3ytMet0fVA",
  authDomain: "train-scheduler-5ae4c.firebaseapp.com",
  databaseURL: "https://train-scheduler-5ae4c.firebaseio.com",
  projectId: "train-scheduler-5ae4c",
  storageBucket: "train-scheduler-5ae4c.appspot.com",
  messagingSenderId: "38916349267"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#button-submit").on('click', function(){
  if ($('#train-name').val() !== "" && $('#destination').val() !== "" && $('#first-train-time').val() !== "" && $('#frequency').val() !== ""){
    trainName = $('#train-name').val().trim()
    destination = $('#destination').val().trim()
    firstTrainTime = $('#first-train-time').val().trim()
    frequency = $('#frequency').val().trim()
    console.log(trainName)
    $('#train-name').val("")
    $('#tdestination').val("")
    $('#first-train-time').val("")
    $('#frequency').val("")
  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
  } 
})

database.ref().on('child_added', function(snapshot){
  var data = snapshot.val() 
  var firstTrainTime = data.firstTrainTime
  var frequency = data.frequency
  
  var firstTrainTimeMoment = moment(firstTrainTime, "HH:mm").subtract(1, "day")
  console.log("First Train Time moment", firstTrainTimeMoment)
 
  var currentTimeMoment = moment()
  console.log("Current Time Moment: ", currentTimeMoment.format("HH:mm"))

  var diffTime = moment().diff(moment(firstTrainTimeMoment), "minutes")
  console.log("Difference in time: ", diffTime)

  var remainder = diffTime % frequency
  console.log("Remainder: ", remainder)

  var timeTilNextTrain = frequency - remainder
  console.log("minutes till train", timeTilNextTrain)

  var nextTrainDepartureTime = moment().add(timeTilNextTrain, "minutes")
  console.log("Next Train Departs at: ", nextTrainDepartureTime.format("hh:mm"))
     
  $("#table-data").append("<tr><td>" + data.trainName + "</td><td>" + data.destination + "</td><td>" + frequency + "</td><td>" + nextTrainDepartureTime.format("hh:mm") + "</td><td>" + timeTilNextTrain + "</td></tr>")
})
