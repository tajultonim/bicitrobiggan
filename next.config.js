const withPWA = require('next-pwa')
const dev = process.env.NODE_ENV === 'development'

module.exports =withPWA({
  pwa: {
    dest: 'public',
    disable: dev,
    register:true,
    skipWaiting:true,
    scope:'/',
    sw:"/sw.js",
    },
  reactStrictMode: true,
  env: {
    Site_Title: "বিচিত্র বিজ্ঞান - অসীম হতেও বেশি",
    Site_Name: "বিচিত্র বিজ্ঞান",
    Site_Desc:
      "বাংলায় বিজ্ঞান চর্চাই আমাদের লক্ষ। বিজ্ঞানের বিচিত্র সব দিক তুলে ধরে বাংলায় বিজ্ঞান চর্চা জনপ্রিয়করণে কাজ করে যাচ্ছে বিচিত্র বিজ্ঞান।",
    Site_Url: "https://bicitrobiggan.ml",
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
});
