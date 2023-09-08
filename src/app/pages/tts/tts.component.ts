import { Component, OnInit, ViewChild } from '@angular/core';
// import {NgxSpinnerService} from "ngx-spinner";
import { TtsService } from "../../services/tts.service";


@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.css']
})
export class TtsComponent implements OnInit {
  @ViewChild('tts') tts: HTMLAudioElement;

  progress: number;

  magic = false;
  sentence: string = "";
  currentTime: number;
  duration: number;
  timer: any;

  audioUrl: string = '/assets/tts.wav';
  audio: HTMLAudioElement;
  isPlaying: boolean;
  time: string;
  selectedLanguageModel: string = null;
  speechIDResponse;

  loggedInUsername = '';
  isLogged = false;
  gender: string;
  languageOptionsByGender: {} = {
    "male": [
      { displayName: "Mert (Turkish)", value: "Turkish1_m" },
      { displayName: "Thomas (German)", value: "German1_m" },
      { displayName: "Tony (English)", value: "English2_m" },
      { displayName: "Steven (English)", value: "English3_m" },
      { displayName: "Vincent (French)", value: "French2_m" },
      { displayName: "Vincenzo (Italian)", value: "Italian2_m" }
    ],
    "female": [
      { displayName: "Pelin (Turkish)", value: "Turkish2_f" },
      { displayName: "Jane (English)", value: "English1_f" },
      { displayName: "Meli (English)", value: "English4_f" },
      // { displayName: "Marian (French)", value: "French2_f" },
      { displayName: "Monicca (Italian)", value: "Italian2_f" }
    ],
    "all": [
      { displayName: "Mert (Turkish)", value: "Turkish1_m" },
      { displayName: "Thomas (German)", value: "German1_m" },
      { displayName: "Tony (English)", value: "English2_m" },
      { displayName: "Steven (English)", value: "English3_m" },
      { displayName: "Vincent (French)", value: "French2_m" },
      { displayName: "Vincenzo (Italian)", value: "Italian2_m" },
      { displayName: "Pelin (Turkish)", value: "Turkish2_f" },
      { displayName: "Jane (English)", value: "English1_f" },
      { displayName: "Meli (English)", value: "English4_f" },
      // { displayName: "Marian (French)", value: "French2_f" },
      { displayName: "Monicca (Italian)", value: "Italian2_f" }
    ]
  };
  constructor(
    private ttsService: TtsService
    // private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      // User is logged in, continue with the normal initialization
      this.loggedInUsername = localStorage.getItem('email')
      // this.isLogged = true;
    }

    this.audio = new Audio();
    this.audio.src = this.audioUrl;
    this.audio.load();
    this.audio.oncanplaythrough = () => {
      this.duration = this.audio.duration;
    };
    this.audio.ontimeupdate = () => {
      this.updateProgress();
    };
    this.audio.onended = () => {
      this.isPlaying = false;
    };
  }

  seek(event: MouseEvent) {
    const target = event.target as HTMLDivElement;
    const width = target.offsetWidth;
    const x = event.offsetX;
    this.audio.currentTime = (x / width) * this.duration;
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateProgress() {
    this.progress = (this.audio.currentTime / this.duration) * 100;
    const currentMinutes = Math.floor(this.audio.currentTime / 60);
    const currentSeconds = Math.floor(this.audio.currentTime - currentMinutes * 60);
    const durationMinutes = Math.floor(this.duration / 60);
    const durationSeconds = Math.floor(this.duration - durationMinutes * 60);
    this.time = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
  }

  // start() {
  //   this.progress1.percentage = 0;
  //   this.spinner.show();
  //   // console.log("sss"+this.sentence)
  //   this.ttsService.generateSpeech(this.sentence).subscribe(event => {
  //       this.magic=true;
  //       // this.results=response.data;
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress1.percentage = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.magic=false;
  //       }
  //     }
  //   );
  //   this.spinner.hide();
  // }


  async gen() {

    this.magic = true;
    this.speechIDResponse = await this.ttsService.generateSpeechID(this.sentence, this.selectedLanguageModel,this.loggedInUsername).toPromise()
    if (this.speechIDResponse) {
      this.ttsService.generateSpeech(this.speechIDResponse.id).subscribe((response: Blob) => {
        this.audio.src = URL.createObjectURL(response);
        this.audio.load();
        this.audio.play();
        this.isPlaying = true;
        // saveAs(response, "audio.wav",{type: 'audio/wav'});
        this.magic = false;
      });
    }
  }

  resetLanguageModel(): void {
    this.selectedLanguageModel = null;
  }
}
