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
 * @fileoverview Controller for post publish modal.
 */

require(
  'components/common-layout-directives/common-elements/' +
  'confirm-or-cancel-modal.controller.ts');

require('domain/utilities/url-interpolation.service.ts');
require('services/context.service.ts');

angular.module('oppia').controller('PostPublishModalController', [
  '$controller', '$scope', '$window', '$uibModalInstance',
  'ContextService', 'UrlInterpolationService',
  'DEFAULT_TWITTER_SHARE_MESSAGE_EDITOR',
  function(
      $controller, $scope, $window, $uibModalInstance,
      ContextService, UrlInterpolationService,
      DEFAULT_TWITTER_SHARE_MESSAGE_EDITOR) {
    $controller('ConfirmOrCancelModalController', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance
    });
    $scope.congratsImgUrl = UrlInterpolationService.getStaticImageUrl(
      '/general/congrats.svg');
    $scope.DEFAULT_TWITTER_SHARE_MESSAGE_EDITOR = (
      DEFAULT_TWITTER_SHARE_MESSAGE_EDITOR);
    $scope.explorationId = (
      ContextService.getExplorationId());
    $scope.explorationLinkCopied = false;
    $scope.explorationLink = (
      $window.location.protocol + '//' +
      $window.location.host + '/explore/' + $scope.explorationId);
    $scope.selectText = function(evt) {
      var codeDiv = evt.currentTarget;
      var range = document.createRange();
      range.setStartBefore(codeDiv.firstChild);
      range.setEndAfter(codeDiv.lastChild);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      $window.document.execCommand('copy');
      $scope.explorationLinkCopied = true;
    };
  }
]);
