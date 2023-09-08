import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  // @Input() url: string;
  // a=this.url;

  constructor(
    private domSanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {

  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  title = 'angular-videoplayer-app';

  playlist = [
    {
      title: 'Agent 327!',
      src: "url",
      type: 'video/mp4'
    },

  ];
  // this.url;

  currentIndex = 0;
  activeVideo = this.playlist[this.currentIndex];
  api!: { getDefaultMedia: () => { (): any; new(): any; subscriptions: { (): any; new(): any; loadedMetadata: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; ended: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; }; }; play: () => void; };



  onPlayerSet(api: any) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.startVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.activeVideo = this.playlist[this.currentIndex];
  }

  startVideo() {
    this.api.play();
  }

  onClickPlaylistVideo(item: { title: string; src: string; type: string; }, index: number) {
    this.currentIndex = index;
    this.activeVideo = item;
  }

}
