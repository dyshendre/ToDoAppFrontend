import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // onSignUp() {
  //   if (this.signupForm.valid) {
  //     this.router.navigate(['/login']);
  //     localStorage.setItem('userData', JSON.stringify(this.signupForm.value));
  //     alert('Sign-up successful! You can now log in.');

  //   }
  // }
  onSignUp() {
    const apiUrl = 'http://localhost:8080/signuplogin/signup'; // Backend API URL

    this.http.post(apiUrl, this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        alert('Signup Successful!');
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup Failed!');
      },
    });
    
    
  }

}
