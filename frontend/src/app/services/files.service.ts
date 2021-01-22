import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fichier } from '../models/fichier';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  url = 'http://127.0.0.1:5000/api/files';
  constructor(private http: HttpClient ) { }

  getFiles(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>(`${this.url}/`);
  }

  addFile(FileToUpload: any): Observable<Fichier> {
    return this.http.post<Fichier>(`${this.url}/upload`, FileToUpload );
  }
}
