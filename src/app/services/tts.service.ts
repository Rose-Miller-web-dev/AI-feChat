import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  private BaseURL = 'https://api.4aithings.com'
  constructor(private http: HttpClient) { }

  generateSpeechID(sentence: string, lang: string, un: string): Observable<any> {

    // Define the headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Define the request body
    const body = {
      sentence: sentence,
      userId: un,
      spk: lang
    };

    return this.http.post(this.BaseURL + '/api/tts/generateSpeech' , body, { headers });

  }

  generateSpeech(speechID: string): Observable<Blob> {
    const url = this.BaseURL + `/api/tts/generateSpeech/${speechID}`;
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(map((res: ArrayBuffer) => new Blob([res], { type: 'audio/wav' })));
    // return this.http.post(this.url + lang, {_}, {responseType: 'arraybuffer'}).pipe(map((res:ArrayBuffer)=>new Blob([res], {type: 'audio/wav'})));
  }

  public putClientSpeech(clientId: string, file: File): Promise<any> {
    const url = `${this.BaseURL}/api/vc/putClientSpeech?clientId=${clientId}&userId=0`;
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'accept': '*/*'
    });

    return this.http.put(url, formData, { headers }).toPromise();
  }

  generateCloneId(sentence: string,speaker: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Define the request body
    const body = {
      sentence: sentence,
      userId: "0",
      spk: speaker
    };
    return this.http.post(this.BaseURL + '/api/vc/clone' , body, { headers });
    // return this.http.post(this.BaseURL + '/api/tts/generateSpeech' , body, { headers });
  // const newPath = this.BaseURL + "/api/vc/cloneSpeech?sentence="+sentence+"&speaker="+speaker;
  //

  //
  //   return this.http.get(newPath, { responseType: 'arraybuffer' }).pipe(map((res: ArrayBuffer) => new Blob([res], { type: 'audio/wav' })));

}

  generateCloneID(sentence: string, spkname: string, un: string): Observable<any> {

    // Define the headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Define the request body
    const body = {
      sentence: sentence,
      userId: un,
      speaker: spkname
    };

    return this.http.post(this.BaseURL + '/api/vc/clone' , body, { headers });

  }
  generateClone(speechID: string): Observable<Blob> {
    const url = this.BaseURL + `/api/vc/clone/${speechID}`;
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(map((res: ArrayBuffer) => new Blob([res], { type: 'audio/wav' })));
    // return this.http.post(this.url + lang, {_}, {responseType: 'arraybuffer'}).pipe(map((res:ArrayBuffer)=>new Blob([res], {type: 'audio/wav'})));
  }

}
// generateSpeech(sentence: string): Observable<HttpEvent<{}>>{
//   let newPath = this.apiUrl + "tts/generateSpeech?sentence="+sentence;
//
//
//   const newRequest = new HttpRequest('POST', newPath,  {
//     reportProgress: true,
//     responseType: 'text'
//   });
//   return this.httpClient.request(newRequest);
//
// }
