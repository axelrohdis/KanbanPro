const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { Tablero } = require("../models");

router.get("/", auth, async (req, res) => {
  const data = await Tablero.findAll({
    where: { UsuarioId: req.user.id },
  });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const tablero = await Tablero.create({
    titulo: req.body.titulo,
    UsuarioId: req.user.id,
  });
  res.json(tablero);
});

// PUT /api/tableros/:id
router.put("/:id", auth, async (req, res) => {
    try {
      const tablero = await Tablero.findByPk(req.params.id);
      if (!tablero) return res.status(404).json({ error: "Tablero no encontrado" });
      await tablero.update({ titulo: req.body.titulo });
      res.json(tablero);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE /api/tableros/:id
  router.delete("/:id", auth, async (req, res) => {
    try {
      const tablero = await Tablero.findByPk(req.params.id);
      if (!tablero) return res.status(404).json({ error: "Tablero no encontrado" });
      await tablero.destroy();
      res.json({ message: "Tablero eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;