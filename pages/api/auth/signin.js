import { adminInit } from "../../../firebase/admin-init";
import axios from "axios";
import { getFirestore } from "firebase-admin/firestore";

export default async function Signin(req, res) {
  const ApiKey = process.env.ClientApiKey;
  if (req.method == "POST") {
    try {
      const id = req.body.id;
      let r;
      const pass = req.body.pass;
      adminInit();
      //console.log(req.body)
      if (!id || !pass) {
        throw error;
      }
      if (!isValidPassword(pass)) {
        res.status(401).json({
          error: {
            code: 401,
            message: "আপনার প্রবেশকৃত পাসওয়ার্ডটি সঠিক নয়।",
            timestamp: new Date().toUTCString(),
          },
        });
      }
      if (isValidEmail(id)) {
        await axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKey}`,
            {
              email: id,
              password: pass,
              returnSecureToken: true,
            }
          )
          .then(({ data }) => {
            r = {
              status: "success",
              code: 200,
              message: "আপনার একাউন্টে সফলভাবে প্রবেশ করা গেছে।",
              tokens: {
                idToken: data.idToken,
                refreshToken: data.refreshToken,
              },
              user: {
                username: JSON.parse(JSON.stringify(data)).displayName.username,
                name: JSON.parse(JSON.stringify(data)).displayName.name,
                email: data.email,
                uid: data.localId,
              },
            };
          })
          .catch(({ response }) => {
              console.log(response.data.error)
            if(response.data.error.message=="EMAIL_NOT_FOUND"){
                r = {
                    error: {
                      code: 400,
                      message: "আপনার ইমেইলটি সঠিক নয়।",
                      timestamp: new Date().toUTCString(),
                    },
                  };
            }
            else if (response.data.error.message == "INVALID_PASSWORD") {
              r = {
                error: {
                  code: 400,
                  message: "আপনার পাসওয়ার্ডটি সঠিক নয়।",
                  timestamp: new Date().toUTCString(),
                },
              };
            } else {
              throw error;
            }
          });
      } else if (isValidUsername) {
        await getFirestore()
          .collection("users")
          .where("username", "==", id)
          .get()
          .then(async (snapshot) => {
            if (!snapshot.docs[0]) {
              r = {
                error: {
                  code: 400,
                  message: "আপনার ইউজারনেইমটি সঠিক নয়।",
                  timestamp: new Date().toUTCString(),
                },
              };
              return;
            }
            const email = snapshot.docs[0].data().email;
            await axios
              .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKey}`,
                {
                  email,
                  password: pass,
                  returnSecureToken: true,
                }
              )
              .then(({ data }) => {
                r = {
                  status: "success",
                  code: 200,
                  message: "আপনার একাউন্টে সফলভাবে প্রবেশ করা গেছে।",
                  tokens: {
                    idToken: data.idToken,
                    refreshToken: data.refreshToken,
                  },
                  user: {
                    username: JSON.parse(JSON.stringify(data)).displayName
                      .username,
                    name: JSON.parse(JSON.stringify(data)).displayName.name,
                    email: data.email,
                    uid: data.localId,
                  },
                };
              })
              .catch(({ response }) => {
                if (response.data.error.message == "INVALID_PASSWORD") {
                  r = {
                    error: {
                      code: 400,
                      message: "আপনার পাসওয়ার্ডটি সঠিক নয়।",
                      timestamp: new Date().toUTCString(),
                    },
                  };
                } else {
                  throw error;
                }
              });
          });
      }
      if (!r) {
        throw error;
      }
      res.status(r.error ? r.error.code : r.code).json(r);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: {
          code: 500,
          message: "কিছু সমস্যা হয়েছে। দয়া করে একটি অভিযোগ জানান।",
          timestamp: new Date().toUTCString(),
        },
      });
    }
  } else {
    res.status(405).json({
      error: {
        code: 405,
        message: "Method not allowed.",
        timestamp: new Date().toUTCString(),
      },
    });
  }
}

function isValidPassword(pass) {
  return pass.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );
}

function isValidEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function isValidUsername(username) {
  return username.match(
    /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
}
