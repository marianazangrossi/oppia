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
 * @fileoverview Controller for display solution modal.
 */

require(
  'pages/exploration-player-page/services/' +
  'audio-translation-manager.service.ts');
require(
  'pages/exploration-player-page/services/' +
  'hints-and-solution-manager.service.ts');
require('pages/exploration-player-page/services/player-position.service.ts');
require('pages/exploration-player-page/services/player-transcript.service.ts');
require('services/audio-player.service.ts');
require('services/autogenerated-audio-player.service.ts');

angular.module('oppia').controller('DisplaySolutionModalController', [
  '$scope', '$rootScope', '$uibModalInstance', 'AudioPlayerService',
  'AudioTranslationManagerService', 'AutogeneratedAudioPlayerService',
  'HintsAndSolutionManagerService', 'PlayerPositionService',
  'PlayerTranscriptService', 'COMPONENT_NAME_SOLUTION', 'EVENT_AUTOPLAY_AUDIO',
  function($scope, $rootScope, $uibModalInstance, AudioPlayerService,
    AudioTranslationManagerService, AutogeneratedAudioPlayerService,
    HintsAndSolutionManagerService, PlayerPositionService,
    PlayerTranscriptService, COMPONENT_NAME_SOLUTION, EVENT_AUTOPLAY_AUDIO) {
    $scope.isHint = false;
    var solution = HintsAndSolutionManagerService.displaySolution();
    var solutionContentId = solution.explanation.getContentId();
    var displayedCard = PlayerTranscriptService.getCard(
      PlayerPositionService.getDisplayedCardIndex());
    var recordedVoiceovers = displayedCard.getRecordedVoiceovers();
    AudioTranslationManagerService.setSecondaryAudioTranslations(
      recordedVoiceovers.getBindableVoiceovers(
        solutionContentId),
      solution.explanation.getHtml(), COMPONENT_NAME_SOLUTION);
    $rootScope.$broadcast(EVENT_AUTOPLAY_AUDIO);
    var interaction = displayedCard.getInteraction();
    $scope.shortAnswerHtml = solution.getOppiaShortAnswerResponseHtml(
      interaction);
    $scope.solutionExplanationHtml =
      solution.getOppiaSolutionExplanationResponseHtml();
    $scope.closeModal = function() {
      AudioPlayerService.stop();
      AutogeneratedAudioPlayerService.cancel();
      AudioTranslationManagerService
        .clearSecondaryAudioTranslations();
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
