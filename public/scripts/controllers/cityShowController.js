angular
  .module('sargetravel')
  .controller('CitiesShowController', CitiesShowController);

CitiesShowController.$inject = ['$http', '$routeParams'];

function CitiesShowController ($http, $routeParams) {
  var vm = this;
  vm.newCity = {};

  $http({
    method: 'GET',
    url: '/api/cities/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.city = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the city', response);
  });

  vm.editCity = function(city) {
    $http({
      method: 'PUT',
      url: '/api/cities/'+ $routeParams.id + '/cities/' + city._id ,
      data: post
    }).then(function successCallback(json) {

    }, function errorCallback(response) {
      console.log('There was an error editing the city', response);
    });
  }

  vm.deleteCity = function (city) {
    $http({
      method: 'DELETE',
      url: '/api/cities/'+ $routeParams.id + '/cities/' + city._id
    }).then(function successCallback(json) {
      var index = vm.city.indexOf(city);
      vm.city.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the city', response);
    });
  }

  vm.createCity = function () {
    $http({
      method: 'POST',
      url: '/api/cities/'+ $routeParams.id + '/cities',
      data: vm.newCity
    }).then(function successCallback(json) {
      vm.city.push(json.data);
      vm.newCity = {};
    }, function errorCallback(response) {
      console.log('There was an error creating the city', response);
    });
  }

}
