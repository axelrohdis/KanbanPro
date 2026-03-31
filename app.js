require("dotenv").config();

const express = require("express");
const path = require("path");
const hbs = require("hbs");

// Sequelize
const { sequelize, Tablero, Lista, Tarjeta } = require("./models");

// Rutas API
const authRoutes = require("./routes/authRoutes");
const tableroRoutes = require("./routes/tableroRoutes");
const listaRoutes = require("./routes/listaRoutes");
const tarjetaRoutes = require("./routes/tarjetaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// HBS
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/layouts"));

// API
app.use("/api/auth", authRoutes);
app.use("/api/tableros", tableroRoutes);
app.use("/api/tableros/:tableroId/listas", listaRoutes);
app.use("/api/listas/:listaId/tarjetas", tarjetaRoutes);

// VISTAS
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// DASHBOARD
app.get("/dashboard", async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      include: {
        model: Lista,
        foreignKey: "TableroId",
        include: {
          model: Tarjeta,
          foreignKey: "ListaId",
        },
      },
    });

    const tableroData = tableros.map(t => t.toJSON());

    res.render("dashboard", { tableros: tableroData });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar dashboard");
  }
});

// CREAR TARJETA
app.post("/nueva-tarjeta", async (req, res) => {
  try {
    const { title, listaId } = req.body;

    await Tarjeta.create({
      titulo: title,
      descripcion: "Nueva tarjeta",
      ListaId: listaId,
    });

    res.redirect("/dashboard");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear tarjeta");
  }
});

// CONEXIÓN BD
sequelize.authenticate()
  .then(() => console.log("✅ DB conectada"))
  .catch(err => console.error("❌ Error DB:", err));

// SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});