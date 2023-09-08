import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2, Output, EventEmitter,
} from "@angular/core";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js'
import RecordPlugin from "wavesurfer.js/dist/plugins/record";

@Component({
  selector: "app-waveform",
  templateUrl: "./waveform.component.html",
  styleUrls: ["./waveform.component.css"],
})
export class WaveformComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() isAudio = null;
  @Input() isVideo = null;

  region: any = null;

  wave: WaveSurfer = null;
  play: boolean = true;
  zoom = 0;

  wsRegions: RegionsPlugin;
  record: RecordPlugin;
  activeRegion: any = null;

  random = (min, max) => Math.random() * (max - min) + min;
  randomColor = () => `rgba(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)}, 0.5)`;

  // "https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3";
  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, private elementRef: ElementRef) { }


  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#3d75e8", //1c3648
        progressColor: "#1c3648", //3d75e8
        cursorWidth: 4,
        minPxPerSec: 100,
        sampleRate: 16000,
        plugins: [
          TimelinePlugin.create({
            height: 10,
            timeInterval: 0.1,
            primaryLabelInterval: 1,
            style: {
              fontSize: '10px',
              // color: '#f1e8f3',
            },
          }),
          // RegionsPlugin.create()
        ],
      });

      this.wave.on("ready", () => {
        //alert("I'm ready");
        // this.wave.play();
      });

      this.wsRegions = this.wave.registerPlugin(RegionsPlugin.create());


      // this.record = this.wave.registerPlugin(RecordPlugin.create())
    });
  }



  onRegionChanged(start,end): void{


    this.region = this.wsRegions.addRegion({
      start: start,
      end: end,
      color: this.randomColor(),
    });

    // this.wave.on("ready", () => {
      this.wave.seekTo(this.region.start / this.wave.getDuration());
      this.wave.play();
      this.wave.on("audioprocess", () => {
        if (this.wave.getCurrentTime() >= this.region.end) {
          this.wave.pause();
        }
      });
    // });

    this.wave.on("decode", () => {

      this.wave.setTime(this.region.start)


    });

    // this.wave.on("decode", () => {
    //   // const startTime = this.region.start; // Assuming the region has 'start' property
    //   this.wave.seekTo(this.region.start / this.wave.getDuration());
    //   this.wave.play();
    //   this.play = false;
    // });

    this.wsRegions.enableDragSelection({
      color: 'rgba(255, 0, 0, 0.1)',
    });

    let loop: boolean = false;
    // console.log("loop:"+loop);


    this.wsRegions.on('region-clicked', (region, e) => {
      e.stopPropagation(); // prevent triggering a click on the waveform

      if (this.activeRegion === region) {
        // If the clicked region is already active, pause it
        this.wave.stop();
        this.activeRegion = null;
      } else {
        // Pause the currently active region, if any
        if (this.activeRegion) {
          this.wave.stop();
        }
      }

        // Play the clicked region
        this.activeRegion = region;
        // region.setOptions({ color: this.randomColor() });
        this.wave.seekTo(region.start / this.wave.getDuration());
        this.wave.play();
        this.play = false;
      // }
    });

    this.wsRegions.on('region-updated', (region) => {
      if (this.activeRegion === region) {
        this.activeRegion = region;
      }
    });

    this.wave.on('timeupdate', (currentTime) => {
      // When the end of the region is reached
      if (this.activeRegion && this.wave.isPlaying() && currentTime >= this.activeRegion.end) {
        if (loop) {
          // If looping, jump to the start of the region
          this.wave.setTime(this.activeRegion.start)

        } else {
          // Otherwise, exit the region
          this.wave.pause();
          this.activeRegion = null
        }
      }

    });

    this.wave.on('interaction', () => (this.activeRegion = null));


  }

// Record

  onPlayPressed(): void {
    this.wave.play();
    this.play = false;
  }
  onPausePressed(): void {
    this.wave.pause();
    this.play = true;
  }
  onStopPressed(): void {
    this.wave.stop();
    this.play = true;
  }


  // onForwardPressed(): void {
  //   this.wave.skipForward(2);
  //   this.play = true;
  // }
  // onBackwardPressed(): void {
  //   this.wave.skipBackward(2);
  //   this.play = true;
  // }
  onZoomInPressed(): void {
    this.zoom = this.zoom + 1;
    this.wave.zoom(this.zoom);
  }
  onZoomOutPressed(): void {
    this.zoom = this.zoom - 1;
    this.wave.zoom(this.zoom);
  }


  ngOnInit(): void {
    if (!this.wave) {
      this.generateWaveform();
    }
    this.cdr.detectChanges();
    // console.log(this.url);

    //const mediaEli: HTMLMediaElement = document.querySelector("video");
    Promise.resolve().then(() => this.wave.load(this.url));



  }


  ngOnChanges(changes: SimpleChanges): void {
    if ( (!changes.url.firstChange) ) {
      this.wave.destroy();
      this.generateWaveform();
      this.cdr.detectChanges();

      Promise.resolve().then(() => this.wave.load(changes.url.currentValue));
    }


  }


}
