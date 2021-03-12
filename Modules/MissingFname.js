const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const missingFName = async () => {
  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var query = { "First Name": "" };
  const missingFName = await dbo.collection("patient").find(query).toArray();

  var len = missingFName.length;
  console.log(missingFName);
  return missingFName;
};

exports.missingFName = missingFName;
