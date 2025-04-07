import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubjectModel } from '../model/SubjetModel';

@Injectable({
  providedIn: 'root'
})
export class SubjetServiceService {
  private url: string = `${environment.HOST}Subjet/`;
  constructor(private http: HttpClient, private router: Router) {}
  
  getSubjetsForAdd(id_student: number) {
    return this.http.get<any>(
      `${this.url}GetSubjetForAdd/${id_student}`
    );
  }

  getSubjetAsignated(id_student: number){
    return this.http.get<any>(
      `${this.url}GetSubjetAsignated/${id_student}`
    );
  }
}
