import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVideoSelectorComponent } from './audio-video-selector.component';

describe('AudioVideoSelectorComponent', () => {
  let component: AudioVideoSelectorComponent;
  let fixture: ComponentFixture<AudioVideoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVideoSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVideoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
