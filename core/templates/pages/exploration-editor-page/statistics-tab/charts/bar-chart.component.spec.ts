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
 * @fileoverview Unit tests for barChart.
 */

describe('Bar Chart directive', function() {
  var ctrl = null;
  var $scope = null;

  var mockedChart = null;

  beforeEach(angular.mock.module('oppia'));

  afterAll(function() {
    // Resetting google global property.
    window.google = undefined;
    Object.defineProperty(window, 'google', {
      get: () => undefined
    });
    ctrl.$onDestroy();
  });

  describe('when $scope data is not an array', function() {
    beforeEach(angular.mock.inject(function($injector, $componentController) {
      var $rootScope = $injector.get('$rootScope');

      mockedChart = {
        draw: () => {}
      };

      // @ts-ignore window.google should have properties from google
      // third-party library according to the lint.
      window.google = {};
      // This approach was choosen because spyOnProperty() doesn't work on
      // properties that doesn't have a get access type.
      // Without this approach the test will fail because it'll throw
      // 'Property google does not have access type get' error.
      // eslint-disable-next-line max-len
      // ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
      // ref: https://github.com/jasmine/jasmine/issues/1415
      Object.defineProperty(window, 'google', {
        get: () => ({})
      });
      spyOnProperty(window, 'google').and.callFake(() => ({
        visualization: {
          arrayToDataTable: () => {}
        }
      }));

      $scope = $rootScope.$new();
      $scope.data = () => ({});
      ctrl = $componentController('barChart', {
        $scope: $scope,
        $element: [{}]
      });
      ctrl.$onInit();
    }));

    it('should not redraw chart', function() {
      const drawSpy = spyOn(mockedChart, 'draw');
      angular.element(window).triggerHandler('resize');
      expect(drawSpy).not.toHaveBeenCalled();
    });
  });

  describe('when google is not defined', function() {
    beforeEach(angular.mock.inject(function($injector, $componentController) {
      var $rootScope = $injector.get('$rootScope');

      mockedChart = {
        draw: () => {}
      };

      // @ts-ignore window.google should have properties from google
      // third-party library according to the lint.
      window.google = {};
      // This approach was choosen because spyOnProperty() doesn't work on
      // properties that doesn't have a get access type.
      // Without this approach the test will fail because it'll throw
      // 'Property google does not have access type get' error.
      // eslint-disable-next-line max-len
      // ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
      // ref: https://github.com/jasmine/jasmine/issues/1415
      Object.defineProperty(window, 'google', {
        get: () => ({})
      });
      spyOnProperty(window, 'google').and.callFake(() => ({
        visualization: {
          arrayToDataTable: () => {}
        }
      }));

      $scope = $rootScope.$new();
      $scope.data = () => [];
      $scope.options = () => ({});
      ctrl = $componentController('barChart', {
        $scope: $scope,
        $element: [{}]
      });
      ctrl.$onInit();
    }));

    it('should not redraw chart', function() {
      angular.element(window).triggerHandler('resize');
      expect(window.google.visualization.BarChart).not.toBeDefined();
    });
  });

  describe('when google is defined and $scope data is an array',
    function() {
      beforeEach(angular.mock.inject(function($injector, $componentController) {
        var $rootScope = $injector.get('$rootScope');

        mockedChart = {
          draw: () => {}
        };

        // @ts-ignore window.google should have properties from google
        // third-party library according to the lint.
        window.google = {};
        // This approach was choosen because spyOnProperty() doesn't work on
        // properties that doesn't have a get access type.
        // Without this approach the test will fail because it'll throw
        // 'Property google does not have access type get' error.
        // eslint-disable-next-line max-len
        // ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        // ref: https://github.com/jasmine/jasmine/issues/1415
        Object.defineProperty(window, 'google', {
          get: () => ({})
        });
        spyOnProperty(window, 'google').and.callFake(() => ({
          visualization: {
            BarChart: () => mockedChart,
            arrayToDataTable: () => {}
          }
        }));

        $scope = $rootScope.$new();
        $scope.data = () => [];
        $scope.options = () => ({
          chartAreaWidth: 0,
          colors: [],
          height: 0,
          width: 0
        });
        ctrl = $componentController('barChart', {
          $scope: $scope,
          $element: [{}]
        });
        ctrl.$onInit();
      }));

      it('should redraw chart', function() {
        const drawSpy = spyOn(mockedChart, 'draw');
        angular.element(window).triggerHandler('resize');
        expect(drawSpy).toHaveBeenCalled();
      });
    });
});
