import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:7194/api/Video'; 
  constructor(private http: HttpClient) { }

  getSessionId(): Observable<{ sessionId: string }> {
    return this.http.get<{ sessionId: string }>(`${this.baseUrl}/session`);
  }
  
  getToken(sessionId: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.baseUrl}/token?sessionId=${sessionId}`);
  }
  
}
