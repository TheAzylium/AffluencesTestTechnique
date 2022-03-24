import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {}

  getHelloWorld() {
    return this._http.get<{ text: string }>('http://localhost:3000');
  }

  checkIfRessourceAvailable(datetime: any) {
    return this._http.get<{available: boolean}>(
      `http://localhost:8080/resource/1337/available?datetime=${datetime}`
    );
  }
}
