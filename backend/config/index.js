const Cloud = require('@google-cloud/storage')
const path = require('path')
require('dotenv').config();

const serviceKey = path.join(__dirname, './ok.json')
const projectid = process.env.GCP_PROJECT_ID;
const { Storage } = Cloud

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: projectid,
})

module.exports = storage;