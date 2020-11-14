const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp()

const db = admin.firestore()

const createProfile = (userRecord, context) => {
  const { email, phoneNumber, uid, displayName, photoURL } = userRecord

  return db
    .collection('users')
    .doc(uid)
    .set({ email, phoneNumber, displayName, photoURL })
    .catch(console.error)
}

exports.authOnCreate = functions.auth.user().onCreate(createProfile)
