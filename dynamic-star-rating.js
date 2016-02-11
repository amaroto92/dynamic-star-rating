angular
  .module('dynamicStarRating', [])
  // This directive uses materialize grade icons to make a rating UI, where the current stars and maximum stars can vary depending on the configuration.
  .directive('starRating',
	function() {
		return {
			restrict : 'AE', //A’ – Attribute (You want to use your directive as <div rating>) ‘E’ – Element (Use it as <rating>)
			template : '<ul class="rating">'
					 + '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)" class="material-icons">'
					 + 'grade'
					  + '</li>'
					 + '</ul>',
			scope : {
				ratingValue :"=?", // The ‘=?’ for ratingValue indicates that ratingValue is optional expects an object from the directive.
				max : '=', // The ‘=’expects an object from the directive.
				onRatingSelected : '&' // The ‘&’ symbol tells  onRatingSelected  to expect a function, Server call. (not implemented)
			},
			link : function(scope, elem, attrs) { // link function to handle the click and call it from inside the template
				if (scope.ratingValue == undefined)
				{
     			 	scope.ratingValue = "-1";
    			}
				var updateStars = function() {
					scope.stars = []; //There is also another variable on the scope called stars. We have not declared it inside the scope object because only those variables that need to passed in from the HTML are specified there.
					for ( var i = 0; i < scope.max; i++) { //<!--The scope.max is variable is declared on the directive's scope to get the maximum value of the rating passed in through the HTML.-->
						scope.stars.push({
							filled : i < scope.ratingValue //every element of stars array has an object with value ‘filled‘ that is evaluated to true or false based on the value of scope.ratingValue that we get from the DOM. 
						});
					}
				};

				// The toggle function when clicked along with the $index value which is nothing but the index of the list element inside the repeater. 
				// The toggle() function has to be on the scope for it to be accessible from the template. The toggle() function increments or decrements the value of the scope.ratingValue according to the index. 
				// This triggers the $watch() function which then updates the state of the stars.
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				//The $watch() is a method on the scope that is used to watch the state of an objects on the scope. 
				//Here, the $watch method detects changes in the value of scope.ratingValue object, and it executes the updateStars method when it detects a change.
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}

);

