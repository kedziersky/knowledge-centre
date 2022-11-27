const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
const FieldValue = require("firebase-admin").firestore.FieldValue;

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user().onCreate(async (user) => {
  try {
    const userDoc = {
      email: user.email,
    };
    await admin.firestore().collection("users").doc(user.uid).set(userDoc);
  } catch (e) {
    console.log(e);
  }
});

exports.likeVideo = functions.firestore
  .document("/users/{userId}/likes/{videoId}")
  .onWrite(async (change, context) => {
    const videoId = context.params.videoId;
    const { like } = change.after.data();
    if (like) {
      await admin
        .firestore()
        .collection("likes")
        .doc(videoId)
        .set(
          {
            likes: FieldValue.increment(1),
          },
          { merge: true }
        );
    } else {
      await admin
        .firestore()
        .collection("likes")
        .doc(videoId)
        .set(
          {
            likes: FieldValue.increment(-1),
          },
          { merge: true }
        );
    }
  });

exports.addToApptensionFeed = functions.firestore
  .document("/apptensionFeed")
  .onCreate(async (snap, context) => {
    const feed = snap.data();
    const { userName, url, category } = feed;

    return request.post(process.env.SLACK_WEBHOOK, {
      json: {
        text: `🚀 ${userName} has added a new feed post to a category ${category}! Here's a link ${url} `,
      },
    });
  });

exports.addToVideoFeed = functions.firestore
  .document("/video")
  .onCreate(async (snap, context) => {
    const feed = snap.data();
    const { authors, category } = feed;

    return request.post(process.env.SLACK_WEBHOOK, {
      json: {
        text: `🚀 A new video was added to a category ${category}! Talk was presented by ${authors} `,
      },
    });
  });
