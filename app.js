const express = require("express");
var mongo = require("mongodb");
const app = express();
const findPatient = require("./Modules/MissingFname");
const ImpData = require("./Modules/ImportData");
const patientData = require("./Modules/ViewPatientData");
const DropData = require("./Modules/DropCSVCollection");
const ScheduleEmail = require("./Modules/SchedulEmail");
const missingEmail = require("./Modules/MissingEmails");

const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const csvtojson = require("csvtojson");

// app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.send("Welcome to Human Care Systems");
});

missingEmail.missingEmail().then(function (result) {
  console.log(result); // "Some User token"
});

// ImpData.ImportData();
// patientData.ViewPatientCollection();
// DropData.DropCollection().then(function(result) {
//     console.log(result) // "Some User token"
//  })

// ScheduleEmail.ScheduleEmail().then(function(result) {
//     console.log(result) // "Some User token"
//  })

// DropData.DropCollection();
// findPatient.missingFName();

app.listen(3001, () => {
  console.log("Server Started on Port 3001");
});
