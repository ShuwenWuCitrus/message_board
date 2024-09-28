const express = require("express");

const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/message/:id", (req, res) => {
  const message = messages[req.params.id];
  res.render("message", { message: message });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { name, text } = req.body;
  messages.push({ text, user: name, added: new Date() });
  res.redirect("/");
});
app.listen(3001, () => {
  console.log("Listening on port 3001.");
});
