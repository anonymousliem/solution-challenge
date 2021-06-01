const {Spanner} = require('@google-cloud/spanner');
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
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
    res.status(500).send({ err });
  }
});

app.get("/spanner/:id", async (req, res) => {
    try {
      
      let data = await getNotesById(req.params.id);
  
      if (data == null) {
  
          res.status(404).send("No record found")
      }
      res.send(data)
    } catch (err) {
      res.status(500).send({ err });
    }
});

app.post("/spanner/", async (req, res) => {
    try {
        await tableNote.insert([
            {AccountId: req.body.AccountId, Note: req.body.Note}
        ])
       res.status(200).send("data added!");
    } catch (err) {
    console.log("failed")
    }
  });

async function getAllNotes() {
  // The query to execute
  const query = {
    sql: 'SELECT AccountId, Note FROM Notes',
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
      sql: 'SELECT Note FROM Notes WHERE AccountId=' + id,
    };
  
    let result = await database.run(query);
    if (result[0]) {
      var rows = result[0].map((row) => row.toJSON());
      return rows;
    } else {
      return null;
    }
}


