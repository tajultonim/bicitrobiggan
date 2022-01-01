import { adminInit } from "../../../firebase/admin-init";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { sendEmailVerification } from "../../../auth/sendmail";
import axios from "axios";

export default async function Signup(req, res) {
  const ApiKey = process.env.ClientApiKey;
  if (req.method == "POST") {
    try {
      const user = req.body;
      user.name = user.name.toString().trim();
      if (
        !isValidPassword(user.password.toString()) ||
        !isValidEmail(user.email.toString()) ||
        !isValidUsername(user.username.toString()) ||
        user.name.toString().length <= 6
      ) {
        let error;
        if (!isValidUsername(user.username.toString())) {
          error =
            "ইউজারনেম-এ শুধুমাত্র ইংরেজি বর্ণমালা, ডট (.) এবং আন্ডারস্কোর (_) ব্যবহারযোগ্য";
        } else if (!isValidEmail(user.email.toString())) {
          error = "আপনার প্রবেশকৃত ইমেইলটি সঠিক নয়";
        } else if (user.name.toString().length <= 5) {
          error = "নাম কমপক্ষে ৬ অক্ষরের হতে হবে";
        } else {
          error = "পাসওয়ার্ড-এ একটি নাম্বার ও একটি বিশেষ চিহ্ন আবশ্যক";
        }
        res.status(422).json({
          error: {
            code: 422,
            message: error,
            timestamp: new Date().toUTCString(),
          },
        });
        return false;
      }

      adminInit();
      // clientInit();
      const db = getFirestore();
      const ouser = await db
        .collection("users")
        .where("identifiers", "array-contains-any", [
          user.username.toString().toLowerCase(),
          user.email.toString().toLowerCase().replace(/\./g, ""),
        ])
        .get();
      let error;
      ouser.forEach((doc) => {
        if (
          doc
            .data()
            .identifiers.includes(
              user.username.toString().toLowerCase().replace(/\./g, "")
            )
        ) {
          error = "ইউজারনেমটি ব্যবহারযোগ্য নয়।";
          if (
            doc
              .data()
              .identifiers.includes(
                user.email.toString().toLowerCase().replace(/\./g, "")
              )
          ) {
            error = "এই ইমেইল দ্বারা আগেই একটি একাউন্ট খোলা রয়েছে।";
          }
        } else if (
          doc
            .data()
            .identifiers.includes(
              user.email.toString().toLowerCase().replace(/\./g, "")
            )
        ) {
          error = "এই ইমেইল দ্বারা আগেই একটি একাউন্ট খোলা রয়েছে।";
        }
      });

      if (error) {
        res.status(409).json({
          error: {
            code: 409,
            message: error,
            timestamp: new Date().toUTCString(),
          },
        });
        return false;
      } else {
        const nuser = {
          identifiers: [
            user.username.toString().toLowerCase(),
            user.email.toString().toLowerCase().replace(/\./g, ""),
          ],
          username: user.username,
          email: user.email,
          name: user.name,
          phone: "",
          createdAt: FieldValue.serverTimestamp(),
          displayProfile: "",
          posts: [],
          comments: [],
          likes: [],
          follows: [],
          followers: [],
        };
        const docRef = getFirestore().collection("users");
        await getAuth()
          .createUser({
            email: nuser.email,
            emailVerified: false,
            password: user.password,
            displayName: `{name:"${nuser.name}",username:"${nuser.username}"}`,
          })
          .then(async (fuser) => {
            await docRef
              .doc(fuser.uid)
              .set(nuser)
              .then(async (nuser) => {
                getAuth()
                  .generateEmailVerificationLink(fuser.email, {
                    url: `${
                      req.headers.host.includes("localhost:")
                        ? "http://"
                        : "https://"
                    }${req.headers.host}${
                      user.ref ? user.ref : "/" + user.username
                    }`,
                  })
                  .then((link) => {
                    const params = new URLSearchParams(new URL(link).search);
                    params.delete("apiKey");
                    params.set("email", user.email);
                    let url = `${
                      req.headers.host.includes("localhost:")
                        ? "http://"
                        : "https://"
                    }${req.headers.host}${
                      new URL(link).pathname
                    }?${params.toString()}`;
                    return sendEmailVerification(fuser.email, user.name, url);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                const additionalClaims = {
                  isVerified: false,
                };
                const customToken = await getAuth().createCustomToken(
                  fuser.uid,
                  additionalClaims
                );
                await axios
                  .post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${ApiKey}`,
                    { token: customToken, returnSecureToken: true }
                  )
                  .then(({ data }) => {
                    //console.log(fuser.displayName)
                    res.status(200).json({
                      status: "success",
                      code: 200,
                      message:
                        "নতুন একাউন্ট সফলভাবে তৈরি হয়েছে। ভেরিফিকেশন লিংক এর জন্য আপনার ইমেইল চেক করুন।",
                      tokens: data,
                      user: {
                        username: JSON.parse(JSON.stringify(fuser)).displayName.username,
                        name: JSON.parse(JSON.stringify(fuser)).displayName.name,
                        email: fuser.email,
                      },
                    });
                  });
              });
          });
      }
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



