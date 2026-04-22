import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:6060/dashboard'; 

  constructor(private http: HttpClient) { }

  getResumoDashboard(): Observable<any> {
    const token = localStorage.getItem('access_token');
    console.log("Meu token no Angular é:", token); // ou de onde você armazena o token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.API_URL, { headers });
  }
}