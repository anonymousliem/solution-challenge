const Firestore = require('@google-cloud/firestore');
require("dotenv").config();


const db = new Firestore({
  projectId: process.env.projectId,
  keyFilename: './config/key.json',
});

const docRef = db.collection('users').doc('alovelace');

async function addCollection(){
    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      });
}

async function getCollection(){
    const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
}

b()