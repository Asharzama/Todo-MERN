const express = require("express");
const cors = require("cors");
const mongoConnect = require("./mongo");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/todo", async (req, res) => {
  const todo = req.body;
  const connect = await mongoConnect();
  const result = await connect.insertOne(todo);
  res.send(result);
});

app.put("/todo", async (req, res) => {
  const todo = req.body;

  const connect = await mongoConnect();
  const result = await connect.updateOne(todo, {
    $set: {
      isChecked: true,
    },
  });
  res.send(result);
});

app.put("/edit", async (req, res) => {
  const todo = req.body;

  const connect = await mongoConnect();
  const result = await connect.updateOne(
    { taskNumber: todo.taskNumber },
    {
      $set: {
        work: todo.task,
      },
    }
  );
  res.send(result);
});

app.delete("/todo", async (req, res) => {
  const id = req.body;
  const connect = await mongoConnect();
  const result = await connect.deleteOne(id);
  res.send(result);
});

app.get("/", async(req, res) => {
  const connect = await mongoConnect();
  const result = await connect.find({}).toArray();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
