const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/authMiddleware");
const { Lista } = require("../models");

// POST /api/tableros/:tableroId/listas
router.post("/", auth, async (req, res) => {
  try {
    const lista = await Lista.create({
      titulo: req.body.titulo,
      TableroId: req.params.tableroId,
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tableros/:tableroId/listas/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const lista = await Lista.findByPk(req.params.id);
    if (!lista) return res.status(404).json({ error: "Lista no encontrada" });
    await lista.update({ titulo: req.body.titulo });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tableros/:tableroId/listas/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const lista = await Lista.findByPk(req.params.id);
    if (!lista) return res.status(404).json({ error: "Lista no encontrada" });
    await lista.destroy();
    res.json({ message: "Lista eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;