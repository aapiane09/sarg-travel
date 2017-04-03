angular
  .module('sargetravel')
  .controller('PostsIndexController', PostsIndexController);


PostsIndexController.$inject = ['$http'];

function postIndexController ($http) {
    var vm = this;
    vm.newPost = {};
    vm.newPost = {
    name: ''
    };
    vm.posts =[];

$http({
 method: 'GET',
 url: '/api/posts'
}).then(function successCallback(response) {
  console.log(response);
  vm.posts = response.data;
}, function errorCallback(response) {
 console.log('There was an error getting the data', response);
});

vm.createPost = function () {
    $http({
      method: 'POST',
      url: '/api/posts',
      data: vm.newPost,
    }).then(function successCallback(response) {
      vm.posts.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting', response);
    });
}
vm.deletePost = function(post){
  $http({
    method: 'DELETE',
    url: '/api/posts/' + post._id
  }).then(function successCallback(json) {
    var index = vm.posts.indexOf(post);
    console.log("index is:" + index);
    vm.posts.splice(index,1)
  }, function errorCallback(reponse) {
    console.log('There was an error deleting the post')
});
}

vm.editPost = function (post) {
    $http({
      method: 'PUT',
      url: '/api/posts/'+post._id,
      data: post
    }).then(function successCallback(json) {

    }, function errorCallback(response) {
      console.log('There was an error editing the post', response);
    });
  }
