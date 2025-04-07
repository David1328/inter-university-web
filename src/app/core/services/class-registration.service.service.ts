import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClassRegistrationModel } from '../model/ClassRegistrationModel';

@Injectable({
  providedIn: 'root'
})
export class ClassRegistrationServiceService {

  private url: string = `${environment.HOST}ClassRegistration/`;
    constructor(private http: HttpClient, private router: Router) {}
    
    PostAddSubjet(ClassToAssignate: ClassRegistrationModel) {
      return this.http.post<any>(
        `${this.url}PostAddSubjet/`,
        ClassToAssignate
      );
    }
    DeleteSubjetToStudent(documentStudent:number,idSubjet:string) {
      return this.http.delete<any>(
        `${this.url}DeleteSubjetToStudent/${documentStudent}/${idSubjet}`
      );
    }
}
