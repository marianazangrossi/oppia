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
 * @fileoverview Unit tests for TranslationSuggestionReviewModalController.
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// the code corresponding to the spec is upgraded to Angular 8.
import { UpgradedServices } from 'services/UpgradedServices';
// ^^^ This block is to be removed.

describe('Translation Suggestion Review Modal Controller', function() {
  var $scope = null;
  var $uibModalInstance = null;
  var SuggestionModalService = null;

  var contentHtml = 'Content html';
  var reviewable = true;
  var translationHtml = 'Translation html';

  beforeEach(angular.mock.module('oppia', function($provide) {
    var ugs = new UpgradedServices();
    for (let [key, value] of Object.entries(ugs.getUpgradedServices())) {
      $provide.value(key, value);
    }
  }));

  beforeEach(angular.mock.inject(function($injector, $controller) {
    var $rootScope = $injector.get('$rootScope');
    SuggestionModalService = $injector.get('SuggestionModalService');

    $uibModalInstance = jasmine.createSpyObj(
      '$uibModalInstance', ['close', 'dismiss']);

    spyOnAllFunctions(SuggestionModalService);

    $scope = $rootScope.$new();
    $controller('TranslationSuggestionReviewModalController', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance,
      contentHtml: contentHtml,
      reviewable: reviewable,
      translationHtml: translationHtml
    });
  }));

  it('should init the variables', function() {
    expect($scope.contentHtml).toBe(contentHtml);
    expect($scope.contentHtml).toBe(contentHtml);
    expect($scope.reviewable).toBe(reviewable);
    expect($scope.commitMessage).toBe('');
    expect($scope.reviewMessage).toBe('');
  });

  it('should successfully accept suggestion', function() {
    $scope.reviewMessage = 'Review message example';
    $scope.commitMessage = 'Commit message example';
    $scope.accept();

    expect(SuggestionModalService.acceptSuggestion).toHaveBeenCalledWith(
      $uibModalInstance, {
        action: 'accept',
        commitMessage: 'Commit message example',
        reviewMessage: 'Review message example',
      });
  });

  it('should successfully reject suggestion', function() {
    $scope.reviewMessage = 'Review message example';
    $scope.reject();

    expect(SuggestionModalService.rejectSuggestion).toHaveBeenCalledWith(
      $uibModalInstance, {
        action: 'reject',
        reviewMessage: 'Review message example'
      });
  });

  it('should successfully cancel suggestion', function() {
    $scope.cancel();

    expect(SuggestionModalService.cancelSuggestion).toHaveBeenCalledWith(
      $uibModalInstance);
  });
});
