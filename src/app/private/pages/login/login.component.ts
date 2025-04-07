import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginModel } from 'src/app/core/model/LoginModel';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup<{
    documento: FormControl<string | null>;
    passwordS: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) {
    this.form = this.fb.group({
      documento: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      passwordS: this.fb.control('', [Validators.required])
    });
  }
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if((userString ? JSON.parse(userString) : null) == null){
      this.route.navigate(['login']);
    }else{
      this.route.navigate(['subject-review']);
    }
  }

  ingresar(): void {
    if (this.form.valid) {
      const documento = this.form.value.documento?.toString() || '';
      const password = this.form.value.passwordS || '';
      let accessAplication = new LoginModel();
      this.loginService.GetVerifyAccessUser(documento, password).subscribe(
        response => {
          accessAplication = response.data;
          localStorage.setItem('user', JSON.stringify(accessAplication));
          window.location.reload();
        },
        error => {
          Swal.fire({
            text: error.error.error,
            icon: "error"
          });
        }
      )

    } else {
      this.form.markAllAsTouched();
    }
  }

}
