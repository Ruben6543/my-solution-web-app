import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, pipe, retry, take, tap, throwError } from "rxjs";
import { Music } from "../models/music.types";


export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Injectable()
export class MusicService {
    private apiUrl = 'https://localhost:7174/api/musics'; // Replace with your API URL
  
    constructor(private http: HttpClient) {}
  
    getAllMusic(): Observable<Music[]> {
      return this.http.get<Music[]>(this.apiUrl);
    }
  
    getMusicById(id: string): Observable<Music> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Music>(url);
    }
  
    createMusic(music: Music): Observable<Music> {
      return this.http.post<Music>(this.apiUrl, music);
    }

    updateMusic(music: Music): Observable<Music> {
      const url = `${this.apiUrl}/${music.id}`;
      return this.http.put<Music>(url, music);
    }
  
    deleteMusic(id: string): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url);
    }
  }

