// Copyright 2014 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Service for recommending explorations at the end of an
 * exploration.
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ContextService } from 'services/context.service';
import { ServicesConstants } from 'services/services.constants';
import { UrlService } from 'services/contextual/url.service';

export interface IExplorationSummary {
  'category'?: string;
  'community_owned'?: boolean;
  'id'?: string;
  'language_code'?: string;
  'num_views'?: number;
  'objective'?: string;
  'status'?: string;
  'tags'?: string[];
  'thumbnail_bg_color'?: string;
  'thumbnail_icon_url'?: string;
  'title'?: string;
}
export interface IExplorationSummaries {
  summaries: IExplorationSummary[];
}
type RecommendationsUrlParams = {
  /* eslint-disable camelcase */
  stringified_author_recommended_ids: string;
  collection_id?: string;
  story_id?: string;
  current_node_id?: string;
  include_system_recommendations: string;
  /* eslint-enable camelcase */
};

@Injectable({
  providedIn: 'root'
})
export class ExplorationRecommendationsService {
  constructor(
    private contextService: ContextService,
    private http: HttpClient,
    private urlService: UrlService) {
    ExplorationRecommendationsService.isIframed = this.urlService.isIframed();
    ExplorationRecommendationsService.isInEditorPage = (
      this.contextService.getPageContext() ===
      ServicesConstants.PAGE_CONTEXT.EXPLORATION_EDITOR);
    ExplorationRecommendationsService.isInEditorPreviewMode = (
      ExplorationRecommendationsService.isInEditorPage && (
        this.contextService.getEditorTabContext() ===
        ServicesConstants.EXPLORATION_EDITOR_TAB_CONTEXT.PREVIEW));

    // This check is to ensure getExplorationId method won't be called
    // when ExplorationRecommendationsService is called on UpgradedServices
    // and then throw an error.
    if (this.contextService.getPageContext() !== 'other' &&
        this.contextService.getEditorTabContext() !== null) {
      ExplorationRecommendationsService.explorationId = (
        this.contextService.getExplorationId());
    }
  }
  static isIframed: boolean = null;
  static isInEditorPage: boolean = null;
  static isInEditorPreviewMode: boolean = null;
  static explorationId: string = null;

  getRecommendedSummaryDicts(
      authorRecommendedExpIds: string[],
      includeAutogeneratedRecommendations: boolean,
      successCallback: (value?: Object | PromiseLike<Object>) => void): void {
    let recommendationsUrlParams: RecommendationsUrlParams = {
      stringified_author_recommended_ids: JSON.stringify(
        authorRecommendedExpIds),
      include_system_recommendations: 'false'
    };

    let collectionId = this.urlService.getCollectionIdFromExplorationUrl();
    let storyId = this.urlService.getUrlParams().story_id;
    let currentNodeId = this.urlService.getUrlParams().node_id;
    if (collectionId !== null) {
      recommendationsUrlParams.collection_id = collectionId;
    }
    if (storyId !== null) {
      recommendationsUrlParams.story_id = storyId;
    }
    if (currentNodeId !== null) {
      recommendationsUrlParams.current_node_id = currentNodeId;
    }

    if (
      includeAutogeneratedRecommendations &&
      !ExplorationRecommendationsService.isInEditorPage) {
      recommendationsUrlParams.include_system_recommendations = 'true';
    }

    this.http.get(
      '/explorehandler/recommendations/' +
      ExplorationRecommendationsService.explorationId, {
        params: recommendationsUrlParams
      }).toPromise().then((data: IExplorationSummaries) => {
      successCallback(data.summaries);
    });
  }
}
angular.module('oppia').factory('ExplorationRecommendationsService',
  downgradeInjectable(ExplorationRecommendationsService));
