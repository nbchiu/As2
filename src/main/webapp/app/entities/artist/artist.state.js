(function() {
    'use strict';

    angular
        .module('as2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('artist', {
            parent: 'entity',
            url: '/artist',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Artists'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/artist/artists.html',
                    controller: 'ArtistController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('artist-detail', {
            parent: 'entity',
            url: '/artist/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Artist'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/artist/artist-detail.html',
                    controller: 'ArtistDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Artist', function($stateParams, Artist) {
                    return Artist.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'artist',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('artist-detail.edit', {
            parent: 'artist-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist/artist-dialog.html',
                    controller: 'ArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Artist', function(Artist) {
                            return Artist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('artist.new', {
            parent: 'artist',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist/artist-dialog.html',
                    controller: 'ArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                atname: null,
                                bday: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('artist', null, { reload: 'artist' });
                }, function() {
                    $state.go('artist');
                });
            }]
        })
        .state('artist.edit', {
            parent: 'artist',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist/artist-dialog.html',
                    controller: 'ArtistDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Artist', function(Artist) {
                            return Artist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('artist', null, { reload: 'artist' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('artist.delete', {
            parent: 'artist',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/artist/artist-delete-dialog.html',
                    controller: 'ArtistDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Artist', function(Artist) {
                            return Artist.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('artist', null, { reload: 'artist' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
