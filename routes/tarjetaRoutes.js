const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/authMiddleware");
const { Tarjeta } = require("../models");

// POST /api/listas/:listaId/tarjetas
router.post("/", auth, async (req, res) => {
  try {
    const tarjeta = await Tarjeta.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      ListaId: req.params.listaId,
    });
    res.json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/listas/:listaId/tarjetas/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findByPk(req.params.id);
    if (!tarjeta) return res.status(404).json({ error: "Tarjeta no encontrada" });
    await tarjeta.update({ titulo: req.body.titulo, descripcion: req.body.descripcion });
    res.json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/listas/:listaId/tarjetas/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findByPk(req.params.id);
    if (!tarjeta) return res.status(404).json({ error: "Tarjeta no encontrada" });
    await tarjeta.destroy();
    res.json({ message: "Tarjeta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;