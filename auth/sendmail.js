
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const ClientId = process.env.GAPIClientId;
const ClientSecret = process.env.GAPIClientSecret;
const RefreshToken = process.env.GAPIRefreshToken;
const RedirectUri = process.env.GAPIRedirectUri;
const User = process.env.GAPIUser;
const From = process.env.GAPIFrom;
const SiteName = process.env.Site_Name;
const OAuth2Client = new google.auth.OAuth2(
  ClientId,
  ClientSecret,
  RedirectUri
);
OAuth2Client.setCredentials({ refresh_token: RefreshToken });

export async function sendEmailVerification(email, name, link) {

  try {
    const AccessToken = OAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: User,
        clientId: ClientId,
        clientSecret: ClientSecret,
        refreshToken: RefreshToken,
        accessToken: AccessToken,
      },
    });

    const mailOptions = {
      from: From,
      to: email,
      subject: `${SiteName} এর জন্য আপনার ইমেল যাচাই করুন`,
      text: `হ্যালো ${name},

        আপনার ইমেল ঠিকানা যাচাই করার জন্য এই লিঙ্কটিতে যান।
        
        ${link}
      }
        
        আপনি যদি এই ঠিকানাটি যাচাই করতে না চেয়ে থাকেন, তাহলে এই ইমেলটি অগ্রাহ্য করুন।
        
        ধন্যবাদ,
        
        আপনার ${SiteName} টিম`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}


