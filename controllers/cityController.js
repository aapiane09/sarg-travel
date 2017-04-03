var db = require('../models');

//GET /api/cities
function index(req, res) {
  db.City.find({}, function(err, allCities) {
    res.json(allCities);
  });
}

//GET /api/cities/cityId
function show(req, res) {
  db.City.findById(req.params.cityId, function(err, foundCity) {
    if(err) { console.log('cityController.show error', err); }
    console.log('cityController.show responding with', foundCity);
    res.json(foundCity);
  });
}

//POST /api/cities/
function create(req,res) {
 var userInput = req.body;
  console.log('body',userInput);

  db.City.create(userInput, function(err, city){
    if (err) {console.log('error', err);}
    console.log(city);
    res.json(city);
  });
}

//DELETE  /api/cities/:cityId
function destroy(req, res) {
  db.City.findOneAndRemove({ _id: req.params.cityId }, function(err, foundCity){

    res.json(foundCity);
  });
}

//PUT /api/cities/:cityId
function update(req, res) {
   console.log('updating data', req.body);
   var id = req.params.cityId;
   db.City.findOneAndUpdate({_id:id}, req.body, function(err, foundCity) {

       if(err) { console.log('saving altered city failed'); }
       res.json(foundCity);
     });
}

module.exports = {
  index:index,
  show:show,
  create:create,
  destroy: destroy,
  update: update
};
