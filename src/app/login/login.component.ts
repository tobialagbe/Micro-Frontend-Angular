import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm! : FormGroup;
  error: boolean = false;
  errorMsg: string = "";
  loading: boolean = false;

  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get f() { return this.validateForm.controls; }

  submitForm() {
    this.loading = true;
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      (data: any) => {
        this.loading = false;
        const err = data['error'];
        const res = data['data'];
        const resFormatted = JSON.parse(res.replaceAll("'", '"'));
        if (!err && resFormatted.code === 200) {
          this.authService.setAuthenticated();
          this.router.navigate(['/home']);
        }else{
          this.error = true;
          this.errorMsg = resFormatted.message;
        }
      }
    );
  }


  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  replaceAll(string: string, search: string, replace: string) {
    return string.split(search).join(replace);
  }
  

}
