import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  getStatesUrl = 'https://countriesnow.space/api/v0.1/countries/states';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<any>('../../assets/countries.json').toPromise().then(res => <any[]>res.data).then(data => { return data; });
  }

  getStates(country) {
    const body = {
      "country": country
    }
    return this.http.post(this.getStatesUrl, body);
  }
}
