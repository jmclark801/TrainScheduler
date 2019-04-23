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
  trainName = $('#train-name').val().trim()
  destination = $('#destination').val().trim()
  firstTrainTime = $('#first-train-time').val().trim()
  frequency = $('#frequency').val().trim()
  console.log(trainName)

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
})

database.ref().on('child_added', function(snapshot){
  var data = snapshot.val()
  var nowMoment = moment("X");
  console.log("Now moment: ", nowMoment)
  var dateAddedMoment = moment(data.dateAdded)
  console.log("Date added moment: ", dateAddedMoment)
  var difference = nowMoment.diff(dateAddedMoment)
  console.log("difference: " + difference)
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  var firstTrainTimeMoment = moment(data.firstTrainTime, "X")
  console.log("Now moment: ", nowMoment)
  console.log("First Train Time moment", firstTrainTimeMoment)
  var secondsFromFirstTrain = nowMoment.diff(firstTrainTimeMoment)
  console.log(secondsFromFirstTrain)
  var minutesAway = 12 
  // current time in minutes from FirstTrainTime(3AM = 180 minutes) - firstTrainMinutes using DIFF from EPOCH OK.
  // In example, this is 120 minutes.
  // difference % frequency = 0 = 0 minutes away.
  // time + difference % frequncy = Next Arrival time (converted to time)
  // frequency = 12 minutes
  // current time = nowMoment
  var nextArrival = 12;
  
  $("#table-data").append("<tr><td>" + data.trainName + "</td><td>" + data.destination + "</td><td>" + data.frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")
})




// On submit of the form, get the form details and save them to firebase using .push
// create event listener on change of database .ref()
  // Update table with all entries
  // Need formatting using Moment.js to calculate minutes away, arrival time, etc.
