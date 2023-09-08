import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// This service is used to select sample audio/video and provides 2 observables that components can subscribe to for updates
export class AudioVideoSelectorService {

  selectedAudio: string = "";
  selectedVideo: string = "";
  selectedAudioChange$: Subject<string> = new Subject<string>();
  selectedVideoChange$: Subject<string> = new Subject<string>();
  constructor() { }

  // Updates the audio observable so child components can update themselves
  selectAudio(path: string) {
    this.selectedAudio = path;
    this.selectedAudioChange$.next(path);
  }

  // Updates the video observable so child components can update themselves
  selectVideo(path: string) {
    this.selectedVideo = path;
    this.selectedVideoChange$.next(path);
  }

}
