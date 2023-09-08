import { TestBed } from '@angular/core/testing';

import { AudioVideoSelectorService } from './audio-video-selector.service';

describe('AudioVideoSelectorService', () => {
  let service: AudioVideoSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioVideoSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
