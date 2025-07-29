const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, "dummyData", "data.json");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const authRoutes = require("./auth/authRoutes");
app.use("/auth", authRoutes);




app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  res.json(users);
});

app.post("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;

const newUser = {
  id: maxId + 1,
  name: req.body.name,
};

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  let users = JSON.parse(fs.readFileSync(usersFile));
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");
  users[userIndex].name = req.body.name;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  let users = JSON.parse(fs.readFileSync(usersFile));
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.send("User deleted");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

