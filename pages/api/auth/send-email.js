import { getAuth } from "firebase-admin/auth";
import { sendEmailVerification } from "../../../auth/sendmail";

export default async function SendEmail(req, res) {
  if (req.method == "POST") {
    try {
      const mode = req.body.mode;
      switch (mode) {
        case "resetPassword":
          await sendPasswordResetEmail(req.body.email, continueUrl);
          break;
        case "verifyEmail":
          await sendVerifyEmail(req.body.email, req.body.continueUrl, req).then(
            () => {
              res.status(200).json({
                status: "success",
                code: 200,
                message:
                  "পুনঃযাচাইকরন আবেদন গৃহীত হয়েছে। ভেরিফিকেশন লিংক এর জন্য আপনার ইমেইল চেক করুন।",
                email: req.body.email,
              });
            }
          );
          break;
        default:
          res.status(400).json({
            error: {
              code: 400,
              message: "আপনার রিকয়েস্টটি বৈধ নয়।",
              timestamp: new Date().toUTCString(),
            },
          });
      }
    } catch (err) {
      console.log(err);
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

async function sendVerifyEmail(email, continueUrl, req) {
  await getAuth()
    .generateEmailVerificationLink(email, {
      url: continueUrl,
    })
    .then(async (link) => {
      const params = new URLSearchParams(new URL(link).search);
      params.delete("apiKey");
      params.set("email", email);
      let url = `${
        req.headers.host.includes("localhost:") ? "http://" : "https://"
      }${req.headers.host}${new URL(link).pathname}?${params.toString()}`;
      return await sendEmailVerification(email, "", url);
    });
}

function sendPasswordResetEmail() {
  return;
}
