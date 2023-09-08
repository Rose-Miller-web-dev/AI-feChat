import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import {Observable, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-record-component',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})

export class RecordComponent implements OnInit {
  @ViewChild('waveform', { static: true }) waveformRef: ElementRef;
  @ViewChild('recordButton', { static: true }) recordButtonRef: ElementRef;
  @ViewChild('playButton', { static: true }) playButtonRef: ElementRef;
  @ViewChild('downloadLink', { static: true }) downloadLinkRef: ElementRef;
  @Output() audioUrl: EventEmitter<string> = new EventEmitter<string>();

  private wavesurfer: WaveSurfer;
  private record: RecordPlugin;
  recording: boolean = false;
  playing: boolean = false;
  audioLoaded: boolean = false;
  showWaveform: boolean = true;

  selectedFileUrl: string;
  timerStr: string;
  timer$: Observable<number>;
  subscription: Subscription;
  time: number; // declare the time variable

  ngOnInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.waveformRef.nativeElement,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',

    });

    this.record = this.wavesurfer.registerPlugin(RecordPlugin.create());

    this.wavesurfer.once('ready', () => {
      this.audioLoaded = true;
    });

    this.record.on('stopRecording', () => {
      const link = this.downloadLinkRef.nativeElement;
      link.href = this.record.getRecordedUrl();
      link.download = 'recording.mp3';
      link.style.display = 'none';
      this.audioUrl.emit(this.record.getRecordedUrl());
      this.showWaveform = false;
    });

    this.record.on('startRecording', () => {

      const link = this.downloadLinkRef.nativeElement;
      link.href = '';
      link.download = '';
      link.style.display = 'none';
        this.timer$ = timer(1000, 1000);
        this.subscription = this.timer$.subscribe(val => {
          this.time = val;
          //this.timerDiv.innerHTML = this.transform(this.time);
          this.timerStr = this.transform(this.time);
        });
    }
    );
  }

  toggleRecording(): void {
    this.showWaveform = true;

    if (this.wavesurfer.isPlaying()) {
      this.wavesurfer.pause();
    }

    if (this.record.isRecording()) {
      this.record.stopRecording();
      this.recording = false;
      this.playButtonRef.nativeElement.disabled = false;
      return;
    }

    this.recordButtonRef.nativeElement.disabled = true;

    this.record.startRecording().then(() => {
      this.recording = true;
      this.recordButtonRef.nativeElement.disabled = false;
    });
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hour = hours.toString();
    var min = minutes.toString();
    var sec = seconds.toString();
    if (hours < 10) {hour = '0'+hours;}
    if (minutes < 10) {min = '0'+ minutes;}
    if (seconds < 10) {sec = '0'+ seconds;}
    return hour+':'+min+':'+sec;
  }

  togglePlayback(): void {
    this.wavesurfer.playPause();
    this.playing = !this.playing;
  }

}
