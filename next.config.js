const withPWA = require("next-pwa");
const dev = process.env.NODE_ENV === "development";
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: dev,
    register: true,
    skipWaiting: true,
    scope: "/",
    sw: "/sw.js",
  },
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  env: {
    Site_Title: "বিচিত্র বিজ্ঞান - অসীম হতেও বেশি",
    Site_Name: "বিচিত্র বিজ্ঞান",
    Site_Desc:
      "বাংলায় বিজ্ঞান চর্চাই আমাদের লক্ষ। বিজ্ঞানের বিচিত্র সব দিক তুলে ধরে বাংলায় বিজ্ঞান চর্চা জনপ্রিয়করণে কাজ করে যাচ্ছে বিচিত্র বিজ্ঞান।",
    Site_Url: "https://bicitrobiggan.ml",
    AdminType: "service_account",
    AdminProjectId: "bb-bicitrobiggan",
    AdminPrivateKeyId: "32f88a3befe154c738a7234313a0d7a94f918152",
    AdminPrivateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJKS5ruYDf61fZ\n3JJGp6Wo9V4Up/+kQN/EwFr461hXmoagYrb9piC5soYmXiubI7V8hq8VljdrTg1S\nt95oFNiA6dBamcLJnnOJQdU1D6Pjsjj8eY+t2XlkRJXoSiCcSyblNfwVBtnwttmT\nhGCtHcVjnopHYeUBFZSE4k9mKvQlyXMOdyPojbo6ac7rayNkf3B/Fk0tja9q32nh\nyGhg7i5F7D7MpmrL0gHnIY6MPRHASPmKc3G6DcqYumVcZ8NerGFIliI/ffPVe6mf\nqhsZ8kuj40rK/kS9XRVQ3WYg9u13ox/v9pfHcimf1GoVhM44nL+HgiV8kkCNFpp6\n94AP+/zvAgMBAAECggEAKZmTmQF+zk/MFijQMz5eOuerMhhf/KbR381rwshgt5Uk\nPCzN7PybDewGZA7bc7TZxkvQD2XGRjGY/b86hkmxUE+KIAJmTu2utPbhUZzPZron\noMa+2NP9j6fDXItf3RKJk6MrY2nMTkRyEFiy6XobpPNXY1WyVxwQX76xbs55OQrm\n6ZbduSYX9TXxag7vyUY0AXJd4JyXHI7u61w+L8YhV9Qsysunjn2NJSBTNjf8GwgO\nfryzNge06tqgoHBE72P0KBAxzGm4DvQCbBvH4MzaM8CqS8AeA4PU16cY2gXm1+aD\nZ6wM1vh0YZ8ZjPfnxf3SJEETkPKv3XoUXQZMoEdJOQKBgQDyU2l/BdAMHjfnrFMX\nDmUi1E684CfNw1yxEeVxlcrBWq8QAwzw3nbavtNc2GDwvcZPiHDb7UUBVQoEw2wl\nG8RllXeoH0gJDhgDRZfIJKvjZnZbqjTfk3/nqkE79R/1fi4HifV5jSz6vG4xFj1i\nviNFh3XaExLTlYmp4rFSfNPFiwKBgQDUgxvciCdXkyO+aKlc2veBQlFByC9uJX+F\nS/bOS6u0vCOwpgrXGljf0gzeyhHEXCJ9wVmbW7yCa7kTdFcvIEQmdq/nkzImOmbk\nP4xAZfiCe+SwLsaHTXQTAipLIURDBf4qZV9YPBjOhCJLlR2CrQJ+UwW+WZuET3qe\n5hVgPho6rQKBgQCo38hdZUefqk97fHRLVRTWOO7GYdBbbRJjs/0aMzGhnfjyR631\nDpP1zZau1Xx5SUeylXtRSQEV9JWOzEHJephb0tYYq/Qfm1rQrOch66x+RSGmr+85\nACna4KOljSZAhza8uj///YqjEj4Yp08QSUF7avOOjkxId6YAZqL8wVE0EQKBgGDv\nZRgVKwzxWw6Rox9t6hQV8ga1j50IkcB1xCCZt7r7TrRXKP6xT/TYVXKSbcRJ2pnO\nRldtYvGCvas4GESwzSVWYiqZo/h4D1LyAcGmQdMTPF95FqnFFLtO84fNptuDskoY\nb4NJ9m7NKu+bFxjyXf7NVANd0Ghr8Jzmir2Z1lEJAoGBAIYMKK6159V9ju4ebHC7\nx3oGUH1BkIdXALfql6GL1BWFkzySxoBUZyAOlK8kxzBKw8O1I2ljAl1G//r5/J6E\n0hRFQ8I4lwS3yck2SkiMMh2xQlkAy9fm2CbqIbGbs/O5qgMrADn/5In3n1dfeKN0\nrpU7GBZdBG2C2WFrsnqRTwvy\n-----END PRIVATE KEY-----\n",
    AdminClientEmail:
      "firebase-adminsdk-f9qry@bb-bicitrobiggan.iam.gserviceaccount.com",
    AdminClientId: "104161152957728904856",
    AdminAuthUri: "https://accounts.google.com/o/oauth2/auth",
    AdminTokenUri: "https://oauth2.googleapis.com/token",
    AdminAuthProviderCertUrl: "https://www.googleapis.com/oauth2/v1/certs",
    AdminClientCertUrl:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f9qry%40bb-bicitrobiggan.iam.gserviceaccount.com",
    StorageBucketName: "bb-bicitrobiggan.appspot.com",
    PasswordSecretKey:
      "OO1Vdcag8tT6GYn7lO7Izsiz5BM+gUOKBJlxW1iGh70XKqG0KGfARTNEOEm5CGrCnLDgMrIiKRTRiBsPHzCpWLMTIkqI0Pdg94Aadap6G+QqLvq7lWhuYwHY7XrNTAbhh102SbZgi6bgphZHMWtQ9LTieD/G7H6sNabC8NsCza70GEzBa3l7cSbKRl0M6tOxwhPcPDcF/lo7iCUUlZP2zy6BuQCpmt8kVfKGibL5J8iv6mJV8JPEzxXBCfaBpqB8efaczatchDMOpC8Z4Su2kEWDIAGP2wc1q56QBS1ngQ+qFbpm+5xn1xqLUXrF1uY5g2b3JmvXbBigNENWppFLYhGTJo+qqa2w8noGs1MkAjZvDmoP+SamblFWzDWjh/MiTPvt2XpZeEC3Blgt6DkONfBzxsUlf7BoWGeci8BzVYp/MrRA5a7GiCYqf3/vFLrmem19O8b9Konzro5fdcDmsvPx4KAE7VvIU0iKt8aV2ZvJb6d2Wqiej9qOTqTlTy6AgD4ZEce1DHAWRgN7YWiJN6so0NN4HVRIeGpD+WBUQSAYrNzneT20tPwqXj1Lp/7Ij/ckfFrt2yleSMlsevBXg64B13PxSyRCz01Ye1qcK+EwLURgd7ddHZIYkopk5aacvqbP1x50+dyfyqekwsvwRZF2UJ6q2aKZsJu+dXagcyWSco4AsAEuIFC0vnVw73FbJZJipiVbNw6Z8cgHT7zas0RSPfy0kDjYSUGm/7YwV0zvYPkAZCgHnZFmzvOVk9mBM2rsNa5fGF5un5tLv+ItDmIBtEcW623BtMYqyPAxUCUnKSF5G6EA7osgBGtLFBr3yMs2BkVcWDWtpvks3SKQrwxi0R19HJMN2b6bhssLM6IVwedpsT/ypR/cRF4fCbhnUJfUvABowEMQOcGLdsJtKo+4ZCHvFDVguBKDyB1tAFDegdtI5rXd8zsTA7aQ1OUx/AocRj2Fe4tFizydh6aPoZ/wOCrL90e9Ayt2BHaI/YzWKciCCPqNaxtW1Ma1vN3RwhmCJSTugVOugX3EUmCvwugpZS3wW/2bcfIRR0z96bYiFLApxtDPxYlV8XOoujQJzgAKVJhk7bCzknC7hKCqObK96D2diro2uEP2YBzAU5wmXA5qvHLd6sY0vg0pCf7dMUXDaFpxEzQjidQNrufOdySzpUqY73xRlsDEECLfU8MhzJRiu2U/rWPAtlCdRWhYvzVVeOq8ixOq9PhxLmWstcxJHYjQAPBNKow/EpZ5exiOcvVyfeZmfLNwi2cFtR5H047qyaAoArYN8ASPt/j+31x+5zlCMsQk1rEg/9wLtxY3YuxGcKQIuJRwpj3Ma+89RIaP0/Ez7bVewN9w7YoFJq1Kc/YzSScOEdATuX0ysUv2ciKHLreWuijBlds9x8DEKKKmo+ZnmqonjNcJbNFSD8QIXji4EsmDZ9f3b8bZn6+nIybEEjQP61XjlRDnSoidHQP7eL8gW8rONCnOvmY5OufAPcKpw80EiNaHR8aV5YYaW+6E+K+c2zadwSAOdQ/wViih3cqdMsf7R9XqYOoGGy5SMSgB8KoAbwPs/tS9xRJuA1bv2W2bJPu3vRS+wOWEtrQwXSTU7NBCt4hy+v9TiImdiID0kRzHe5QVC+BWPA0x57Inip0FHdguCK8jNaG2iy2nB0t5bPkUm7of0XakNwgLuQ1bBBSyddKfg77+NvCZhJMjr5Sz2NryuJ2J0W/JdwHiw7iqjBRFUwJJZsbse5F2f9a174aquJn0Q7PHflrKO0x11hGLcPDImDnQ8Q6uJ6/NRGLsBM48MM92C3WQrzkmQy/hQAcqR+MCAFcqYUhmQn606DYyqt71GCKSQpZ4clmgV9Z21mRiQS/QzGs2AexpbJSyuZXGBXE5Xl/vaHZLgInezTBrJADJ88a+NfF4IVwLBAqUr66A+hOLjUm7L9sfhbJPYgzVdG54L+pBVhr71LQ/EEfFGXM1Z111HjWy2bpbyUd8V6kWc1F5zwZB1RZ5JLb+aAQBn4Jxo/TUdko5DgqFpLOOQH1XjEkwdgPg/yTXUo9qhsgLix4I+ekd7lf3WmGOxsYb7CtLk55KMJ1+NAyvKHwlrEzV8EgNRRMC1rgV2s0qmDRTJpRR/N5iCUUyCb3WJYcUtjsGPH6TJySRWYnYV/j32wor43DZfdhLSIl1B3vVU+yYkakiQGAvsy95",
    AccessTokenKey:
      "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",
    RefreshTokenKey:
      "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",
    GAPIClientId:
      "529605338874-hqi3ind0hr0aagav5088c8isnnegl6ur.apps.googleusercontent.com",
    GAPIClientSecret: "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",
    GAPIRefreshToken:
      "1//04hfLFpT4Z7CXCgYIARAAGAQSNwF-L9IrsQ38I3qcXdKp8kYrWc2dZkWIFsyakDlujUCYnP3OaDZtvsjjoPLW9AInB0ud_fUKqs0",
    GAPIRedirectUri: "https://developers.google.com/oaouthplayground",
    GAPIUser: "bicitrobiggan.bb@gmail.com",
    GAPIFrom: "বিচিত্র বিজ্ঞান<noreply@bicitrobiggan.ml>",
    ClientApiKey: "AIzaSyA1j6-7YW-9MqT2qODjDHwq1hKLYNKL0CU",
  },
  webpack(config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce/skins"),
            to: path.join(__dirname, "public/assets/libs/tinymce/skins"),
          },
          {
            from: path.join(__dirname, "node_modules/tinymce/themes"),
            to: path.join(__dirname, "public/assets/libs/tinymce/themes"),
          },
        ],
      })
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
});
