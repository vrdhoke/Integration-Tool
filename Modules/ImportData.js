const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const csvtojson = require("csvtojson");
const ImportData = async () => {
  var result = "";

  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var csv = [];
  await csvtojson()
    .fromFile("Humancare.csv")
    .then(async (csvData) => {
      csv = csvData;
    });

  const patientData = await dbo
    .collection("patient")
    .insertMany(csv);

  return patientData.insertedCount;
};

exports.ImportData = ImportData;
