const functions = require("firebase-functions");
let admin = require("firebase-admin");
admin.initializeApp();
let adaRef = admin.database().ref("/people/id12345");
exports.readData = functions.https.onRequest((request, response) => {
  adaRef.on(
    "value",
    snapshot => {
      response.send(snapshot.val());
    },
    errorObject => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

exports.deleteData = functions.https.onRequest((request, response) => {
  adaRef = admin.database().ref("/people/id12345/age");
  adaRef
    .remove()
    .then(() => {
      return response.send("Removed data Successfully");
    })
    .catch(error => {
      response.send(error);
    });
});
