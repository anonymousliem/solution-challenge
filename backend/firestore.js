const Firestore = require('@google-cloud/firestore');
require("dotenv").config();


const db = new Firestore({
  projectId: process.env.projectId,
  keyFilename: './config/key.json',
});

const docRef = db.collection('membership').doc('boby');

async function addCollection(){
    await docRef.set({
        first: 'Ada 1',
        last: 'Lovelace 2',
        born: 1811
      });
}

async function getCollection(){
  const cityRef = db.collection('membership').doc('ani');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
}
//addCollection()
getCollection()