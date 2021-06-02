const {Spanner} = require('@google-cloud/spanner');
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const { nanoid } = require('nanoid');

app.use(bodyParser.json());
app.use(cors());
// Creates spanner client
const spanner = new Spanner({
    projectId: process.env.projectId,
});
// Initialize spanner instance
const instance = spanner.instance(process.env.instanceId);
const databaseId = process.env.databaseId;
// Initialize database
const database = instance.database(databaseId);
const tableNote = database.table(process.env.tableName);
//const tableNote = database.table(process.env.tableName);

app.get("/testing", (req, res) => {
  res.send("Hello World!!!");
});

var port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port 4000...");
});

app.get("/spanner", async (req, res) => {
  try {
    const args = process.argv.slice(2);
    
    let data = await getAllNotes(...args);

    if (data == null) {

        res.status(404).send("No record found")
    }
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err });
  }
});

app.get("/spanner/:id", async (req, res) => {
    try {
      
      let data = await getNotesById("'"+req.params.id+"'");
      
      if (data == null) {
  
          res.status(404).send("No record found")
      }
      res.send(data)
    } catch (err) {
      console.log(err)
      res.status(500).send({ err });
    }
});

app.post("/spanner/", async (req, res) => {
    try {
        await tableNote.insert([
            {NotesId : nanoid(16) , AccountId: req.body.AccountId, Note: req.body.Note}
        ])
       res.status(200).send("data added!");
    } catch (err) {
    console.log("failed")
    res.status(500).send({err});
    }
});

app.delete("/spanner/:id", async (req, res) => {
  try {
    await DeleteNoteById("'"+req.params.id+"'");
    res.status(201).send("data deleted!");
  } catch (err) {
  res.status(500).send({err});
  console.log(err)
  }
});

async function getAllNotes() {
  // The query to execute
  const query = {
    sql: 'SELECT NotesId, AccountId, Note FROM Notes',
  };

  let result = await database.run(query);
  if (result[0]) {
    var rows = result[0].map((row) => row.toJSON());
    return rows;
  } else {
    return null;
  }
}

async function getNotesById(id) {
    // The query to execute
    const query = {
      sql: 'SELECT Note FROM Notes WHERE NotesId=' + id,
    };
  
    let result = await database.run(query);
    if (result[0]) {
      var rows = result[0].map((row) => row.toJSON());
      return rows;
    } else {
      return null;
    }
}

async function DeleteNoteById(id) {
    database.runTransaction(async (err, transaction) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      // The WHERE clause is required for DELETE statements to prevent
      // accidentally deleting all rows in a table.
      // https://cloud.google.com/spanner/docs/dml-syntax#where_clause
      const [rowCount] = await transaction.runUpdate({
        sql: 'DELETE FROM Notes WHERE NotesId=' + id,
      });
      console.log(`${rowCount} records deleted from Singers.`);
      await transaction.commit();
    } catch (err) {
      console.error('ERROR:', err);
    } 
  });
}


