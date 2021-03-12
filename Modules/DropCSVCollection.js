const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const DropCSVCollection = async () => {
  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var response = await dbo.collection("patient").drop();
  return response;
};

exports.DropCSVCollection = DropCSVCollection;
