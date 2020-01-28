angular.module('nodePlasticc', []).controller('mainController', ($scope, $http) => {
    $scope.formData = {};
    $scope.starData = {};

    // Get all stars
    $http.get('/api/v1/plasticc')
        .success((data) => {
            $scope.starData = data;
            console.log(data);
        })
        .error((error) => {
            console.log('Error: ' + error);
        });

    // Create a new star
    $scope.createStar = () => {
        $http.post('/api/v1/plasticc', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.starData = data;
                console.log(data);
            })
            .error((error) => {
                console.log('Error: ' + error);
            });
    };
    // Delete a star
    $scope.deleteStar = (starID) => {
        $http.delete('/api/v1/plasticc/' + starID)
            .success((data) => {
                $scope.starData = data;
                console.log(data);
            })
            .error((data) => {
                console.log('Error: ' + data);
            });
    };

});
