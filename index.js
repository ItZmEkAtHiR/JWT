const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const posts = [
  {
    post: "Kathir",
    title: "post 1",
  },
  {
    post: "Kathir",
    title: "post 2",
  },
];

app.use(express.json());

let users = [];

app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.username, password: hashedPassword };
    users.push(user);
    console.log(users);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  console.log(JSON.stringify(users));
  let userTemp = users.find((temp) => temp.name === req.body.username);
  console.log("userTemp" + userTemp);
  userTemp == null && res.status(400).send("User not found");

  try {
    (await bcrypt.compare(req.body.password, userTemp.password))
      ? res.send("Success")
      : res.send("Not Allowed");
  } catch {
    res.status(500).send();
  }
});

app.get("/", (req, res) => {
  res.json(posts);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
