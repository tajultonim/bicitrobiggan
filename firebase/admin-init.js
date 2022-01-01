const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.AdminType,
  project_id: process.env.AdminProjectId,
  private_key_id:process.env.AdminPrivateKeyId,
  private_key:process.env.AdminPrivateKey,
  client_email:process.env.AdminClientEmail,
  auth_uri:process.env.AdminAuthUri,
  token_uri:process.env.AdminTokenUri,
  auth_provider_x509_cert_url:process.env.AdminAuthProviderCertUrl,
  client_x509_cert_url:process.env.ClientCertUrl
}

export const adminInit = () => {
  if (!admin.apps.length) {
    return admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
  }
};
