import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get(url);
  }

  post(url, resource) {
    return this.http.post(url, JSON.stringify(resource), {
      headers: this.headers,
    });
  }

  put(url, resource) {
    return this.http.put(url, JSON.stringify(resource), {
      headers: this.headers,
    });
  }
  patch(url, resource) {
    return this.http.patch(url, JSON.stringify(resource), {
      headers: this.headers,
    });
  }

  delete(url) {
    return this.http.delete(url, { headers: this.headers });
  }
}
