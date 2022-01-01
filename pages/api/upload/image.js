import { Storage } from "@google-cloud/storage";
import { adminInit } from "../../../firebase/admin-init";
import secret from "../../../firebase/secret";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const gc = new Storage({
      projectId: process.env.AdminProjectId,
      credentials: {
        client_email: process.env.AdminClientEmail,
        private_key: process.env.AdminPrivateKey,
      },
    });
    const origin = "http://localhost:3000";
    const responseHeader = "Content-Type";
    const maxAgeSeconds = 3600;
    const method = "POST";
    const bucket = gc.bucket(process.env.StorageBucketName);
    await bucket.setCorsConfiguration([
      {
        maxAgeSeconds,
        method: [method],
        origin: [origin],
        responseHeader: [responseHeader],
      },
    ]);

    const file = bucket.file("uploads/image/" + req.query.file);
    const options = {
      expires: Date.now() + 1 * 60 * 1000, 
      fields: { "x-goog-meta-test": "data" },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    response.publicUrl = pubUrl;
    res.status(200).json(response);
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
};
