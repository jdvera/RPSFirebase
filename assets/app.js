var config = {
	apiKey: "AIzaSyA2EotzwpQGNBTRwT24ifxFUF-rvj02yg4",
	authDomain: "james-awesome-project-d2c2c.firebaseapp.com",
	databaseURL: "https://james-awesome-project-d2c2c.firebaseio.com",
	projectId: "james-awesome-project-d2c2c",
	storageBucket: "james-awesome-project-d2c2c.appspot.com",
	messagingSenderId: "156920125072"
};
firebase.initializeApp(config);
var database = firebase.database();




//-------------------------------------------- When the Submit button is clicked
$("#btnSubmit").on("click", function(event) {
	event.preventDefault();

	var submittedName = $("#submit-name").val();
	var submittedDestination = $("#submit-destination").val();
	var submittedTime = $("#submit-time").val();
	var submittedFrequency = $("#submit-frequency").val();

	if (submittedName == "" || submittedDestination == "" || submittedTime == "" || submittedFrequency == "") {
		$("#warning").text("*Please fill in all fields before clicking Submit");
	}
	else {
		var newTrain = {
			dbName: submittedName,
			dbDestination: submittedDestination,
			dbTime: submittedTime,
			dbFrequency: submittedFrequency,
		};

		database.ref().push(newTrain);

		$("#submit-name").val("");
		$("#submit-destination").val("");
		$("#submit-time").val("");
		$("#submit-frequency").val("");
	}
});




// --------------------------------------------- Make new Table Rows
database.ref().on("child_added", function(childSnapshot) {
	var colName = childSnapshot.val().dbName;
	var colDestination = childSnapshot.val().dbDestination;
	var colTime = childSnapshot.val().dbTime;
	var colFrequency = childSnapshot.val().dbFrequency;

	var nextTrain;
	var tMinutesTillTrain;

	var colTimeConverted = moment(colTime, "HH:mm");
    var currentTime = moment();


	if (moment(currentTime) < moment(colTimeConverted)) {
		colTimeConverted = moment(colTime, "HH:mm").subtract(1, "years");
	}
	
	    var diffTime = moment(currentTime).diff(moment(colTimeConverted), "minutes");
	    var tRemainder = diffTime % colFrequency;
	    tMinutesTillTrain = colFrequency - tRemainder;
	    nextTrain = moment(currentTime).add(tMinutesTillTrain, "minutes");
	

	$("#new-row").append("<tr><td>" + colName + "</td><td>" + colDestination + "</td><td>" + colFrequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});