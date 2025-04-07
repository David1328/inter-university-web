import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StudentModel } from '../model/StudentModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}Login/`;
    constructor(private http: HttpClient, private router: Router) {}
    
    GetVerifyAccessUser(user_document:string,user_password:string){
      return this.http.get<any>(
        `${this.url}GetVerifyAccessUser/${user_document}/${user_password}`
      );
    }
    PostCreateNewStudent(newStudent: StudentModel) {
      return this.http.post<any>(
        `${this.url}PostCreateNewStudent`,newStudent
      );
    }
}
