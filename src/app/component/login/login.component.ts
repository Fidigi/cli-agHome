import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthentService } from 'src/app/service/auth/authent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() private embed: string;
  @Output() private embedClose: EventEmitter<String> = new EventEmitter();

  private id_username: string = "username";
  private id_password: string = "password";
  private id_remember: string = "remember";
  
  private loginForm: FormGroup;
  error: string = '';

  constructor(
    private auth: AuthentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    if(this.embed){
      this.id_username += '_em';
      this.id_password += '_em';
      this.id_remember += '_em';
    }
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'remember': [false]
    });
  }

  onSubmit() {
    let credentials = this.loginForm.value;
    this.auth.authenticate(credentials)
      .then(data => {
        //console.log(`received data ${JSON.stringify(data, null, 2)}`);
        this.auth.saveUserData(data.data.signin);
        if(this.embed){
          this.embedClose.emit('login');
        }
      })
      .catch(error => {
        //console.log(`received error ${error}`);
        this.error = "Wrong credentials!";
      });
  }

}
