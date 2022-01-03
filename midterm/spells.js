const express = require('express');
const router = express.Router();

let spells = 
   [
      {
         id: 1001, 
         name: "Rabbit foot positivity", 
         ingredients: [
            {name:"Foot of rabbit"}, 
            {name:"Juice of beetle"}], 
         result: "Good luck"
      },
      {
         id:1002,
         name: "Fox exeunta", 
         ingredients: [
            {name:"Foul of lion"}, 
            {name:"Spirit of hobo"}], 
         result: "Fox removed",
      }, 
      {
         id:1003, 
         name: "Hackus maximum", 
         ingredients: [
            {name:"Oxygenated hydrogen juice"}, 
            {name:"Effluent of bean"},
            {name:"Heat of joy"}], 
         result: "Fast coding"
      }
   ];

// get all spells
router.get('/', function(req, res){
    res.json({"message":spells});
});
// get a specific spell
router.get('/:id', function(req, res){
   const spellId = req.params['id'];
   // console.log(req.params.id, "req.params.id", spells[spellId]);
   const spell = spells.filter(spell => spell.id == spellId)[0];
   res.json({"message":spell});
});
// update a specific spell
router.put('/:id', function(req, res){
   const spellId = req.params['id'];
   const spell = spells.filter(spell => spell.id == spellId)[0];
   spell.name = req.body.name;
   spell.ingredients = req.body.ingredients;
   spell.result = req.body.result;
   // spell = {}
});
// add a new spell
router.post('/', function(req, res){
   res.json(spells);
   let spell = req.body;
   spells.push(spell);
});

module.exports = router;
