const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const missingEmail = async () => {
  const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var query = { CONSENT: "Y", "Email Address": "" };
  const missingEmail = await dbo.collection("patient").find(query).toArray();

  var len = missingEmail.length;
//   console.log(missingEmail);
  var memberId = [];
  missingEmail.forEach(function (item) {
    memberId.push(item["Member ID"]);
  });
  return memberId;
};

exports.missingEmail = missingEmail;
