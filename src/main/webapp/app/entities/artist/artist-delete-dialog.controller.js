(function() {
    'use strict';

    angular
        .module('as2App')
        .controller('ArtistDeleteController',ArtistDeleteController);

    ArtistDeleteController.$inject = ['$uibModalInstance', 'entity', 'Artist'];

    function ArtistDeleteController($uibModalInstance, entity, Artist) {
        var vm = this;

        vm.artist = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Artist.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
