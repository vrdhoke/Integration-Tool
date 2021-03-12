const mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const ScheduleEmail = async () => {
    const db = await mongodb.connect(url);
  const dbo = db.db("humancaredata");
  var query = { CONSENT: "Y" };
  const consentY = await dbo.collection("patient").find(query).toArray();
//   console.log(consentY);

  var emails = [];
  consentY.forEach(function (patient) {
    var memberId = patient["Member ID"];
    // console.log(memberId);
    var today = new Date();
    for (var i = 1; i < 5; i++) {
      today.setDate(today.getDate() + 1);
      var email = {
        id: memberId + "_" + i,
        name: "Day " + i,
        scheduled_date: today.toISOString().slice(0, 10),
        patientId: memberId,
      };
      emails.push(email);
    }
  });

  mongodb.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("humancaredata");
    dbo.collection("emails").insertMany(emails, function (err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });

//   console.log(emails);
  return emails;
};

exports.ScheduleEmail = ScheduleEmail;