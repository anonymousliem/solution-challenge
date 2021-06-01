const {Spanner} = require('@google-cloud/spanner');
const express = require("express");
require("dotenv").config();
const app = express();

// Creates spanner client
const spanner = new Spanner({
    projectId: process.env.projectId,
});
// Initialize spanner instance
const instance = spanner.instance(process.env.instanceId);
const databaseId = process.env.databaseId;
// Initialize database
const database = instance.database(databaseId);


app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

var port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port 4000...");
});

app.get("/spanner", async (req, res) => {
  try {
    const args = process.argv.slice(2);
    
    let data = await quickstart(...args);

    if (data == null) {

        res.status(404).send("No record found")
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({ err });
  }
});

async function quickstart() {
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
