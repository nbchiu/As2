(function() {
    'use strict';
    angular
        .module('as2App')
        .factory('Artist', Artist);

    Artist.$inject = ['$resource', 'DateUtils'];

    function Artist ($resource, DateUtils) {
        var resourceUrl =  'api/artists/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.bday = DateUtils.convertLocalDateFromServer(data.bday);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.bday = DateUtils.convertLocalDateToServer(copy.bday);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.bday = DateUtils.convertLocalDateToServer(copy.bday);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
