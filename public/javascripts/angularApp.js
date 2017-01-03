var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });

        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', [function() {
    var o = {
        posts: [
        {title:'post1', upvotes: 43},
        {title:'post2', link:'https://www.youtube.com/watch?v=n-D1EB74Ckg', upvotes: 3},
        {title:'post3', upvotes: 4},
        {title:'post4', upvotes: 17},
        {title:'post5', upvotes: 21}]
    };
    return o;
}]);

app.controller('MainCtrl', [
    '$scope', 'posts',
    function($scope, posts) {
        $scope.test = 'Hello World';
        $scope.posts = posts.posts;
        $scope.addPost = function(title, upvotes) {
            if (!$scope.title || $scope.title === '') {return;}
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments:[{
                author: 'Joe',
                body: 'Cool post!',
                upvotes: 0},
                {author: 'Bob',
                body: 'Great idea but everything is wrong.',
                upvotes: 0}]});
            $scope.title = '';
            $scope.link = '';
        }
        $scope.incrementUpvotes = function (post) {
            post.upvotes++;
        }
    }]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        $scope.post =  posts.posts[$stateParams.id];
        $scope.addComment = function() {
            if ($scope.body === '') {return ;}
            $scope.post.comment.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body= '';
        };
    }]);










