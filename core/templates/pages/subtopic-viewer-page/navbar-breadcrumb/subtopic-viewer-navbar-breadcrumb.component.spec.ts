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
 * @fileoverview Unit tests for the subtopic viewer navbar breadcrumb.
 */

import { ComponentFixture, TestBed, async, fakeAsync, tick } from
  '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubtopicViewerNavbarBreadcrumbComponent } from
  './subtopic-viewer-navbar-breadcrumb.component';
import { UrlInterpolationService } from
  'domain/utilities/url-interpolation.service';
import { SubtopicViewerBackendApiService } from
  'domain/subtopic_viewer/subtopic-viewer-backend-api.service';
import { UrlService } from 'services/contextual/url.service';
import { ReadOnlySubtopicPageObjectFactory } from
  'domain/subtopic_viewer/ReadOnlySubtopicPageObjectFactory';

class MockUrlService {
  getTopicNameFromLearnerUrl() {
    return 'topic_1';
  }

  getSubtopicIdFromUrl() {
    return 'a';
  }
}

let component: SubtopicViewerNavbarBreadcrumbComponent;
let fixture: ComponentFixture<SubtopicViewerNavbarBreadcrumbComponent>;

describe('Subtopic viewer navbar breadcrumb component', function() {
  let readOnlySubtopicPageObjectFactory = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubtopicViewerNavbarBreadcrumbComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SubtopicViewerBackendApiService,
          useValue: {
            fetchSubtopicData: () => (
              new Promise((resolve) => {
                resolve(
                  readOnlySubtopicPageObjectFactory.createFromBackendDict({
                    subtopic_title: 'Subtopic Title',
                    page_contents: {
                      subtitled_html: {
                        content_id: 'content_1',
                        html: 'This is a html'
                      },
                      recorded_voiceovers: {
                        voiceovers_mapping: {}
                      }
                    },
                    next_subtopic_dict: null,
                    topic_id: 'topic_1'
                  }));
              })
            )
          }
        },
        { provide: UrlService, useClass: MockUrlService },
        UrlInterpolationService,
      ],
    }).compileComponents();
    readOnlySubtopicPageObjectFactory = TestBed.get(
      ReadOnlySubtopicPageObjectFactory);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtopicViewerNavbarBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get subtopic title when component is initialized',
    fakeAsync(() => {
      component.ngOnInit();
      expect(component.topicName).toBe('topic_1');
      tick();
      expect(component.subtopicTitle).toBe('Subtopic Title');
    }));

  it('should get topic url when component is initialized', (() => {
    component.ngOnInit();
    expect(component.getTopicUrl()).toBe('/topic/topic_1');
  }));
});