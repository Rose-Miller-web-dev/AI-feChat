import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioVideoSelectorService } from 'app/services/audio-video-selector.service';

@Component({
  selector: 'audio-video-selector',
  templateUrl: './audio-video-selector.component.html',
  styleUrls: ['./audio-video-selector.component.css']
})

// This component is used to show sample audio/video and user can select one of them
export class AudioVideoSelectorComponent implements OnInit {

  defaultAudios: { name: string, description: string, path: string }[] = [
    {
      name: "test.wav",
      description: "English Male;",
      path: "assets/audio/test.wav"
    },
    {
      name: "sportNews.wav",
      description: "Turkish Male and Female;",
      path: "assets/audio/sportNews.wav"
    }
  ];

  defaultVideos: {name: string, description: string, path: string}[] = [
    {
      name:"videoTest.mp4",
      description: "Man and woman having a conversation in Turkish language;",
      path:"assets/video/videoTest.mp4"
    }
  ]

  @ViewChild('closeModal') closeButton: ElementRef;

  constructor(private audioSelectorService: AudioVideoSelectorService) {
  }

  ngOnInit(): void {
  }

  selectAudio(url: string) {
    this.audioSelectorService.selectAudio(url);
    this.closeButton.nativeElement.click();
  }

  selectVideo(url: string)
  {
    this.audioSelectorService.selectVideo(url);
    this.closeButton.nativeElement.click();
  }
}
