const patientData = require("../Modules/ViewPatientData");
const ImpData = require("../Modules/ImportData");
const DropCSVData = require("../Modules/DropCSVCollection");
const DropEmailData = require("../Modules/DropEmailCollection");
const ScheduleEmail = require("../Modules/SchedulEmail");
const findPatient = require("../Modules/MissingFname");
const missingEmail = require("../Modules/MissingEmails");
const csvtojson = require("csvtojson");

describe("Unit Test cases for Human Care System Integration Tool", () => {
  describe("Unit Test import to collection", () => {
    test("Import patient data", async () => {
      var csv = [];
      await csvtojson()
        .fromFile("Humancare.csv")
        .then((csvData) => {
          csv = csvData;
        });
      var len = csv.length;
      expect.assertions(2);
      await ImpData.ImportData().then((data) => {
        expect(data).toBe(len);
      });
      await patientData.ViewPatientCollection().then((data) => {
        expect(data.length).toBe(len);
      });
    });
  });

  describe("Unit test Comparing the CSV and collections data", () => {
    test("Compare patient data", async () => {
      var csv = [];
      await csvtojson()
        .fromFile("Humancare.csv")
        .then((csvData) => {
          csv = csvData;
        });

      expect.assertions(1);
      const data = await patientData.ViewPatientCollection();
      var len = csv.length;
      data.forEach(function (item) {
        delete item._id;
      });

      //Comparing the CSV data from the
      await expect(data).toEqual(csv);
    });
  });

  describe("Unit Test for missing first names", () => {
    test("Test missing first name of patient", async () => {
      var csv = [];
      await csvtojson()
        .fromFile("Humancare.csv")
        .then((csvData) => {
          csv = csvData;
        });
      var count = 0;
      csv.forEach(function (item) {
        if (item["First Name"] == "") {
          count += 1;
        }
      });
      expect.assertions(1);
      const data = await findPatient.missingFName();
      var len = csv.length;
      await expect(data.length).toBe(count);
    });
  });

  describe("Unit Test missing email addresses with CONSENT Y", () => {
    test("Test missing email addresses of patient", async () => {
      var csv = [];
      await csvtojson()
        .fromFile("Humancare.csv")
        .then((csvData) => {
          csv = csvData;
        });
      var count = 0;
      var patientIds = [];
      csv.forEach(function (item) {
        if (item.CONSENT == "Y" && item["Email Address"] == "") {
          patientIds.push(item["Member ID"]);
        }
      });
      expect.assertions(1);
      const data = await missingEmail.missingEmail();
      await expect(data).toEqual(patientIds);
    });
  });

  describe("Unit test for Schedule Emails", () => {
    test("Schedule Emails", async () => {
      var csv = [];
      await csvtojson()
        .fromFile("Humancare.csv")
        .then((csvData) => {
          csv = csvData;
        });
      var count = 0;
      csv.forEach(function (item) {
        if (item.CONSENT == "Y") {
          count += 1;
        }
      });
      var len = csv.length;
      expect.assertions(1);
      await ScheduleEmail.ScheduleEmail().then((data) => {
        //Each patient has 4 eamils scheduled for Day1,Day2,Day3,Day4
        expect(data.length).toBe(count * 4);
      });
    });
  });

  describe("Drop Patient data every time to rerun the test cases", () => {
    it("Drop patient data", async () => {
      //   expect.assertions(1);
      return await DropCSVData.DropCSVCollection().then((data) => {
        expect(data).toBe(true);
      });
    });
  });
  describe("Drop Email data every time to rerun the test cases", () => {
    it("Drop Email data", async () => {
      //   expect.assertions(1);
      return await DropEmailData.DropEmailCollection().then((data) => {
        expect(data).toBe(true);
      });
    });
  });
});
