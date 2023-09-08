// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../services/chat.service'; // Adjust the import path as needed
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { blob } from 'stream/consumers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatHistory: any[] = null
  audioFile: any
  record: any
  url: any
  recording: any = false
  error: any
  recordedBlob: Blob | null = null

  constructor(private chatService: ChatService,
     private domSanitizer: DomSanitizer, private http: HttpClient) {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url)
  }

  selectedLang: any = 'Turkish'

  mousePressed: boolean = false
  ngOnInit(): void {
    // Initialize the component as needed
    this.chatHistory = []
  }

  overtalk() {
    //console.log("over")
  }

  clicktalk() {
   // console.log("click")
  }

  movetalk() {
    this.mousePressed = true
    //start recording
    this.recording = true
    let mediaConstraints = {
      video: false,
      audio: true,
    }

    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(this.successCallback.bind(this), this.errorCallback.bind(this))
  }

  uptalk() {
    //stop recording
    this.mousePressed = false
    this.recording = false
    this.record.stop(this.processRecording.bind(this))
    
  }

  saveAudio(blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.href = url
    a.download = 'chatTr2.wav'
    a.click()
  }

  saveHistory(historyFile: any) {
    const fileUrl = URL.createObjectURL(historyFile)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = fileUrl
    a.download = 'history.json'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(fileUrl)

  }

  successCallback(stream) {
    var options = {
      mimeType: 'audio/wav',
    }
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder
    this.record = new StereoAudioRecorder(stream, options)
    this.record.record()
  }

  processRecording(blob) {
    this.recordedBlob = blob;
    this.url = URL.createObjectURL(blob)
    this.sendMessage()
  }

  errorCallback() {
    this.error = 'cannot play audio in your browser!'
  }

  sendMessage(): void {
    if (!this.recordedBlob) {
      console.error('No recorded audio to send.');
      return;
    }

    
    try {
      let response = [
        {
          
          "role": "user",
          "content": "1"
        },
        {
          
          "role": "assistant",
          "content": "2"
        }
      ]
      
      this.chatHistory.push(response[0])
      this.chatHistory.push(response[1])
      
    } catch(err) {
      console.log("here's the error ", err)
    }


    // Simulate sending an audio file and chat history
    const jsonHistory = JSON.stringify(this.chatHistory)
    const blob = new Blob([jsonHistory], { type: 'application/json' })    
    const historyFile = new File([blob], 'history.json', { type: 'application/json' })
    this.audioFile = new File([this.recordedBlob], 'chatTr2.wav', { type: 'audio/x-wav' })
    
    const audioFile = this.audioFile
    const language = this.selectedLang;
    const userId = 0;

    console.log(historyFile, "the history file", this.audioFile, "the audio file")
    this.chatService.sendMessageWithAudioAndHistory(audioFile, historyFile, language, userId)
      .subscribe(response => {
        console.log('Response is :', response)
        try {
          this.chatHistory.push(response[0])
          this.chatHistory.push(response[1])
          console.log(JSON.stringify(this.chatHistory))

        } catch(err) {
          console.error()
        }
        
      })
   }

}
