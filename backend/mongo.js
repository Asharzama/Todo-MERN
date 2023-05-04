const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const mongoConnect = async () => {
  const connect = await client.connect();
  const db = connect.db("todolist");
  return db.collection("todos");
};

module.exports = mongoConnect;
