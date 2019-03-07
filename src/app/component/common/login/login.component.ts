import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthentService } from 'src/app/service/auth/authent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthentService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'remember': [false]
    });
  }

  onSubmit() {
    this.auth.authenticate(this.loginForm.value)
      .then(data => {
        //console.log(`received data ${JSON.stringify(data, null, 2)}`);
        this.auth.saveUserData(data.data.signin);
      })
      .catch(error => {
        console.log(`received error ${error}`);
        this.error = "Wrong credentials!";
      });
  }

}
