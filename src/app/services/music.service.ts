import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, pipe, retry, take, tap, throwError } from "rxjs";
import { CreateMusic, Music } from "../models/music.types";


export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Injectable()
export class MusicService {
    private apiUrl = 'https://localhost:7174/api/musics';
  
    constructor(private http: HttpClient) {}
  
    getAllMusic(): Observable<Music[]> {
      return this.http.get<Music[]>(this.apiUrl);
    }
  
    getMusicById(id: string): Observable<Music> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Music>(url);
    }
  
    createMusic(music: CreateMusic): Observable<CreateMusic> {
      return this.http.post<CreateMusic>(this.apiUrl, music);
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

