angular
  .module('sargetravel')
  .controller('CitiesIndexController', CitiesIndexController);


CitiesIndexController.$inject = ['$http'];

function cityIndexController ($http) {
    var vm = this;
    vm.newCity = {};
    vm.newCity = {
    name: ''
    };
    vm.cities =[];

$http({
 method: 'GET',
 url: '/api/cities'
}).then(function successCallback(response) {
  console.log(response);
  vm.cities = response.data;
}, function errorCallback(response) {
 console.log('There was an error getting the city', response);
});

vm.createCity = function () {
    $http({
      method: 'POST',
      url: '/api/cities',
      data: vm.newCity,
    }).then(function successCallback(response) {
      vm.cities.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the city', response);
    });
}
vm.deleteCity = function(city){
  $http({
    method: 'DELETE',
    url: '/api/cities/' + city._id
  }).then(function successCallback(json) {
    var index = vm.cities.indexOf(city);
    console.log("index is:" + index);
    vm.cities.splice(index,1)
  }, function errorCallback(reponse) {
    console.log('There was an error deleting the city')
});
}

vm.editCity = function (city) {
    $http({
      method: 'PUT',
      url: '/api/cities/'+city._id,
      data: post
    }).then(function successCallback(json) {

    }, function errorCallback(response) {
      console.log('There was an error editing the city', response);
    });
  }
