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
 * @fileoverview Unit tests for donate page.
 */

import { TestBed } from '@angular/core/testing';
import { DonatePageComponent } from './donate-page.component';
import { SiteAnalyticsService } from 'services/site-analytics.service';
import { UrlInterpolationService } from
  'domain/utilities/url-interpolation.service';
import { WindowDimensionsService } from
  'services/contextual/window-dimensions.service';
import { WindowRef } from 'services/contextual/window-ref.service';

describe('Donate page', () => {
  const siteAnalyticsServiceStub = new SiteAnalyticsService(
    new WindowRef());

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [DonatePageComponent],
      providers: [
        {provide: SiteAnalyticsService, useValue: siteAnalyticsServiceStub},
        UrlInterpolationService,
        {
          provide: WindowDimensionsService,
          useValue: {
            isWindowNarrow: () => true
          }
        },
        {
          provide: WindowRef,
          useValue: {
            nativeWindow: {
              location: {
                href: ''
              }
            }
          }
        }
      ]
    }).overrideComponent(DonatePageComponent, {
      set: {
        // The template is being overwritten because require is being
        // used on component, which will throw an error on unit tests.
        template: ''
      }
    }).compileComponents();
  });

  beforeEach(() => {
    this.fixture = TestBed.createComponent(DonatePageComponent);
    this.component = this.fixture.componentInstance;
  });

  it('should successfully instantiate the component from beforeEach block',
    () => {
      expect(this.component).toBeDefined();
    });

  it('should set component properties when ngOnInit() is called', () => {
    this.component.ngOnInit();

    expect(this.component.windowIsNarrow).toBe(true);
    expect(this.component.donateImgUrl).toBe(
      '/assets/images/general/opp_donate_text.svg');
  });

  it('should donate throught amazon sucessfully', (done) => {
    spyOn(siteAnalyticsServiceStub, 'registerGoToDonationSiteEvent')
      .and.callThrough();

    this.component.onDonateThroughAmazon();
    expect(siteAnalyticsServiceStub.registerGoToDonationSiteEvent)
      .toHaveBeenCalledWith('Amazon');

    setTimeout(() => {
      expect(this.component.windowRef.nativeWindow.location.href).toBe(
        'https://smile.amazon.com/ch/81-1740068');

      done();
    }, 150);
  });

  it('should donate throught paypal sucessfully', () => {
    spyOn(siteAnalyticsServiceStub, 'registerGoToDonationSiteEvent')
      .and.callThrough();

    this.component.onDonateThroughPayPal();
    expect(siteAnalyticsServiceStub.registerGoToDonationSiteEvent)
      .toHaveBeenCalledWith('PayPal');
  });
});
