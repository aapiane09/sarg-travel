angular
  .module('sargetravel')
  .controller('PostsShowController', PostsShowController);

PostsShowController.$inject = ['$http', '$routeParams'];

function PostsShowController ($http, $routeParams) {
  var vm = this;
  vm.newPost = {};

  $http({
    method: 'GET',
    url: '/api/posts/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.post = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the post', response);
  });

  vm.editPost = function(post) {
    $http({
      method: 'PUT',
      url: '/api/posts/'+ $routeParams.id + '/posts/' + post._id ,
      data: post
    }).then(function successCallback(json) {

    }, function errorCallback(response) {
      console.log('There was an error editing the post', response);
    });
  }

  vm.deletePost = function (post) {
    $http({
      method: 'DELETE',
      url: '/api/posts/'+ $routeParams.id + '/posts/' + post._id
    }).then(function successCallback(json) {
      var index = vm.post.indexOf(post);
      vm.post.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the post', response);
    });
  }

  vm.createPost = function () {
    $http({
      method: 'POST',
      url: '/api/posts/'+ $routeParams.id + '/posts',
      data: vm.newPost
    }).then(function successCallback(json) {
      vm.post.push(json.data);
      vm.newPost = {};
    }, function errorCallback(response) {
      console.log('There was an error creating the post', response);
    });
  }

}
