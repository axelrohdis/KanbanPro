const express = require("express");
const path = require("path");
const fs = require("fs");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views/layouts"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  const data = fs.readFileSync("./data.json", "utf-8");

  const parsedData = JSON.parse(data);

  res.render("dashboard", {
    boards: parsedData.boards,
  });
});

app.post("/nueva-tarjeta", (req, res) => {
  const nuevaTarea = req.body.title;

  const data = fs.readFileSync("./data.json", "utf-8");
  const parsedData = JSON.parse(data);

  parsedData.boards[0].lists[0].cards.push({
    title: nuevaTarea,
  });

  const updatedData = JSON.stringify(parsedData, null, 2);

  fs.writeFileSync("./data.json", updatedData);

  res.redirect("/dashboard");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
