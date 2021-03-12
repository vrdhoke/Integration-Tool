const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const ViewPatientCollection = async () => {
  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  const patientData = await dbo.collection("patient").find({}).toArray();

  var len = patientData.length;
  //   console.log(patientData);
  return patientData;
};

exports.ViewPatientCollection = ViewPatientCollection;
