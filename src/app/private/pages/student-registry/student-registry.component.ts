import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentModel } from 'src/app/core/model/StudentModel';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-registry',
  templateUrl: './student-registry.component.html',
  styleUrls: ['./student-registry.component.scss']
})
export class StudentRegistryComponent{
  form: FormGroup<{
    first_name: FormControl<string | null>;
    last_name: FormControl<string | null>;
    career: FormControl<string | null>;
    documento: FormControl<string | null>;
    passwordS: FormControl<string | null>;
  }>;

  constructor(private loginService: LoginService,
    private fb: FormBuilder,
    private route: Router) {
    this.form = this.fb.group({
      first_name: this.fb.control('', [Validators.required]),
      last_name: this.fb.control('', [Validators.required]),
      career: this.fb.control('', [Validators.required]),
      documento: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      passwordS: this.fb.control('', [Validators.required])
    });
  }
  RegistryStudent() {
    let newStudent = new StudentModel();
    newStudent.nameStudent = this.form.value.first_name?.toString();
    newStudent.lastName = this.form.value.last_name?.toString();
    newStudent.career = this.form.value.career?.toString();
    newStudent.document = Number.parseInt(this.form.value.documento?.toString() ?? '0')
    newStudent.passwordUser = this.form.value.passwordS?.toString();
    this.loginService.PostCreateNewStudent(newStudent).subscribe(
      response => {
        Swal.fire({
          text: response.data,
          icon: "success"
        });
        this.sleep(500);
        this.route.navigate(['login']);
      },
      error => {
        Swal.fire({
          text: error.error.error,
          icon: "error"
        });
      }
    )
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
