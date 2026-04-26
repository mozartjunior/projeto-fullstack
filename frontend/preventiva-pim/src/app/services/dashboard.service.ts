import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:6060/dashboard'; 

  constructor(private http: HttpClient) { }

  getResumoDashboard(){
    // const token = localStorage.getItem('access_token');
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });

    return this.http.get<any>(this.API_URL);
  }
}