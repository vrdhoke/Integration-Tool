const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const DropEmailCollection = async () => {
  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var response = await dbo.collection("emails").drop();
  return response;
};

exports.DropEmailCollection = DropEmailCollection;
