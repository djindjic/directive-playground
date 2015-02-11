angular.module('app', [])

.controller('MainCtrl', function($scope) {
  $scope.person = {
    name: 'John Doe',
    profession: 'Fake name'
  };
  
  $scope.header = 'Person';
})

.controller('DirControler', function($scope, $transclude, $element) {
  this.person = {
    name: 'Directive Joe',
    profession: 'Scope guy'
  };
  
  this.dirVar = {a:'aaa'};

  $transclude($scope, function(clone, scope) {
    $element.append(clone);
  });
})

.directive('person', function() {
  return {
    restrict: 'EA',
    scope: {
      header: '@'
    },
    // replace: true,
    // template: '<div ng-transclude></div>',
    transclude: true,
    controller: 'DirControler',
    bindToController: true,
    controllerAs: 'dirCtrl',
    link: function(scope, element, attrs, ctrl, transclude) {
      // scope.person = {
      //   name: 'Directive Joe',
      //   profession: 'Scope guy'
      // };
      
      scope.header = 'Directive\'s header';
      // transclude(scope, function(clone, scope) {
      //   element.append(clone);
      // });
    }
  };
});

