require("dotenv").config();

const bcrypt = require("bcryptjs");

const { sequelize, Usuario, Tablero, Lista, Tarjeta } = require("./models");

async function seed() {
  try {
    await sequelize.sync({ force: true });

    console.log("Base de datos sincronizada");

    // Password encriptada
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    // Usuarios:
    const usuario1 = await Usuario.create({
      nombre: "Kia",
      email: "kia@catmail.com",
      password: hashedPassword,
    });

    const usuario2 = await Usuario.create({
      nombre: "Maya",
      email: "mayita@dogmail.com",
      password: hashedPassword,
    });

    // Tableros:
    const tablero1 = await Tablero.create({
      titulo: "App para cuidadores de Mascotas",
      UsuarioId: usuario1.id,
    });

    const tablero2 = await Tablero.create({
      titulo: "App para veterinario a domicilio",
      UsuarioId: usuario1.id,
    });

    const tablero3 = await Tablero.create({
      titulo: "MarketPlace de productos para mascotas",
      UsuarioId: usuario2.id,
    });

    // Listas
    const lista1 = await Lista.create({
      titulo: "Pendiente",
      TableroId: tablero1.id,
    });

    const lista2 = await Lista.create({
      titulo: "En progreso",
      TableroId: tablero1.id,
    });

    // Tarjetas
    await Tarjeta.create({
      titulo: "Diseñar login",
      descripcion: "Crear pantalla de login",
      ListaId: lista1.id,
    });

    await Tarjeta.create({
      titulo: "Configurar DB",
      descripcion: "Instalar PostgreSQL",
      ListaId: lista2.id,
    });

    console.log("Datos de prueba creados");

    process.exit();
  } catch (error) {
    console.error(" Error en seed:", error);
  }
}

seed();
