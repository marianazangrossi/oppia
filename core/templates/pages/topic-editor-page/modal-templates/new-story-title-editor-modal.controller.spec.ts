// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for NewStoryTitleEditorModalController.
 */

const CONSTANTS = require('constants.ts');

describe('New Story Title Editor Modal Controller', function() {
  var $scope = null;
  var $uibModalInstance = null;

  beforeEach(angular.mock.inject(function($injector, $controller) {
    var $rootScope = $injector.get('$rootScope');

    $uibModalInstance = jasmine.createSpyObj(
      '$uibModalInstance', ['close', 'dismiss']);

    $scope = $rootScope.$new();
    $controller('NewStoryTitleEditorModalController', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance
    });
  }));

  it('should check if properties was initialized correctly', function() {
    expect($scope.storyTitle).toBe('');
    expect($scope.MAX_CHARS_IN_STORY_TITLE).toBe(
      CONSTANTS.MAX_CHARS_IN_STORY_TITLE);
  });

  it('should check if a provided story title is empty', function() {
    expect($scope.isStoryTitleEmpty('')).toBe(true);
    expect($scope.isStoryTitleEmpty('Story Title')).toBe(false);
    expect($scope.isStoryTitleEmpty()).toBe(false);
    expect($scope.isStoryTitleEmpty(null)).toBe(false);
  });
});
