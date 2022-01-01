import { getAuth } from "firebase-admin/auth";

export default async function VerifyIdToken(req, res) {
  if (req.method == "POST") {
    try {
      getAuth()
        .verifyIdToken(req.body.idToken)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
        })
        .catch((error) => {
          // Handle error
        });
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
