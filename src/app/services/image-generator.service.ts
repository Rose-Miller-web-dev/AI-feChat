// image-generator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';

interface ImageData {
  url: string;
}

export interface ImageResponse {
  created: number;
  data: ImageData[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageGeneratorService {
  private baseUrl = 'https://api.4aithings.com/api/IG/';

  constructor(private http: HttpClient) { }

  // generateImage(sentence: string): Observable<ImageResponse> {
  //   const headers = new HttpHeaders({
  //     'Accept': '*/*'
  //   });
  //
  //   return this.http.post<ImageResponse>(
  //     `${this.baseUrl}generateImage?sentence=${encodeURIComponent(sentence)}`,
  //     { headers }
  //   );
  // }

  generateArt(sentence: string): Observable<Blob> {
    const url = `${this.baseUrl}generateArt?sentence=${encodeURIComponent(sentence)}`;

    return this.http.post(url, {}, {responseType: 'arraybuffer'}).pipe(map((res:ArrayBuffer)=>new Blob([res], {type: 'image/png'})));

  }

  private BaseURL = 'https://api.4aithings.com'

  generateImageID(sentence: string): Observable<any> {

    // // Define the headers
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('accept', '*/*');
    //
    // // Define the request body
    // const body = {
    //   sentence: encodeURIComponent(sentence),
    //   userId: "0"
    // };
    //
    // return this.http.post(this.BaseURL + '/api/IG/generateImage' , body, { headers });

    return this.http.post<any>(this.BaseURL + '/api/IG/generateArt?sentence=' +sentence+"&userId=0",  {
      reportProgress: true
    });
  }

  generateImage(imageID: string): Observable<Blob> {
    const url = this.BaseURL + `/api/IG/generateArt/${imageID}`;
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(map((res: ArrayBuffer) => new Blob([res], { type: 'image/png' })));
    // return this.http.post(this.url + lang, {_}, {responseType: 'arraybuffer'}).pipe(map((res:ArrayBuffer)=>new Blob([res], {type: 'audio/wav'})));
  }

}
