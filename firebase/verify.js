import admin from "firebase-admin/app";
const serviceAccount = require("./secret.json");
export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://bb-bicitrobiggan-default-rtdb.firebaseio.com/",
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {});
};
