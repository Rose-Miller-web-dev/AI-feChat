import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.4aithings.com/api/chat/chat?';

  constructor(private http: HttpClient) {}

  sendMessageWithAudioAndHistory(
    audioFile: File,
    historyFile: File,
    language: string,
    userId: number
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', audioFile, audioFile.name);
    formData.append('history', historyFile, historyFile.name);

    const params = new HttpParams()
      .set('language', language)
      .set('userId', userId.toString());

    const headers = new HttpHeaders({
      'Accept': '*/*'
    });

    return this.http.post(this.apiUrl, formData, { params, headers });
  }
}
