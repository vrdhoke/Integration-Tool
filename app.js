const express = require("express");
var mongo = require("mongodb");
const app = express();
const findPatient = require("./Modules/MissingFname");
const ImpData = require("./Modules/ImportData");
const patientData = require("./Modules/ViewPatientData");
const DropData = require("./Modules/DropCSVCollection");
const ScheduleEmail = require("./Modules/SchedulEmail");
const missingEmail = require("./Modules/MissingEmails");

app.get("/", (req, res) => {
  res.send("Welcome to Human Care Systems");
});

ImpData.ImportData();

ScheduleEmail.ScheduleEmail().then(function(result) {
  console.log(result) // "Some User token"
})

missingEmail.missingEmail().then(function (result) {
  console.log(result); // "Some User token"
});

findPatient.missingFName();


// DropData.DropCollection().then(function(result) {
//     console.log(result) // "Some User token"
//  })


app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
