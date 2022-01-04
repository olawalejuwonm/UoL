const express = require("express");
const router = express.Router();

let spells = [
  {
    id: 1001,
    name: "Rabbit foot positivity",
    ingredients: [{ name: "Foot of rabbit" }, { name: "Juice of beetle" }],
    result: "Good luck",
  },
];
//get a specific spell
router.get("/:id", function (req, res) {
  const spellId = req.params["id"];
  // console.log(req.params.id, "req.params.id", spells[spellId]);
  const spell = spells.filter((spell) => spell.id == spellId)[0];
  res.json({ message: spell });
});

// add a new spell
router.post("/", function (req, res) {
  let spell = req.body;
  let existingSpell = spells.find((s) => s.id === spell.id);
  if (existingSpell) {
    return res.json({ message: "Spell already exist" });
  }
  spells.push(spell);
  res.json(spells);
});

module.exports = router;
