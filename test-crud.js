const { sequelize, Tablero, Lista, Tarjeta } = require("./models");

async function testCRUD() {
  try {

    await sequelize.authenticate();

    console.log("Conectado a la base de datos");

    // Crear:

    const lista = await Lista.findOne();

    const nuevaTarjeta = await Tarjeta.create({
      titulo: "Nueva tarea",
      descripcion: "Esta es una tarjeta creada desde test",
      ListaId: lista.id,
    });

    console.log("Tarjeta creada:", nuevaTarjeta.titulo);

    // Leer:

    const tablero = await Tablero.findOne({
      include: {
        model: Lista,
        include: Tarjeta,
      },
    });

    console.log("Tablero con listas y tarjetas:");
    console.log(JSON.stringify(tablero.toJSON(), null, 2));

    // Actualizar:

    nuevaTarjeta.titulo = "Tarea actualizada";
    await nuevaTarjeta.save();

    console.log("Tarjeta actualizada");

   // Borrar:

    await nuevaTarjeta.destroy();

    console.log("Tarjeta eliminada");

    process.exit();

  } catch (error) {
    console.error(error); 
  }
}

testCRUD();