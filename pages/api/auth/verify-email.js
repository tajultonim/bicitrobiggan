import axios from "axios";

export default async function Verify(req, res) {
  const ApiKey = process.env.ClientApiKey;
  if (req.method == "POST") {
    try {
      const actionCode = req.body.actionCode;
      await axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${ApiKey}`,
          { oobCode: actionCode }
        )
        .then(({ data }) => {
          res.status(200).json({
            displayName: data.displayName,
            email: data.email,
            emailVerified: data.emailVerified,
          });
        });
    } catch (err) {
      res.status(400).json({
        error: {
          code: 400,
          message:
            "ভেরিফিকেশন কোডটি বৈধ নয় অথবা মেয়াদ উত্তির্ণ। দয়া করে নতুন করে আবেদন করুন।",
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
