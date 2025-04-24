import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/ApiResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  isLoggedIn = false;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
      // Check if user is already logged in
      this.isLoggedIn = !!localStorage.getItem('user');
  }

  onLogin() {
    this.formSubmit(this.loginForm.value);
  }

  formSubmit(formData: any){
    let body: any = {
      email: formData.email,
      password: formData.password,
    };
    const apiUrl = 'http://localhost:8080/signuplogin/login'; // Backend API URL
    
    this.http.post<ApiResponse>(apiUrl, body).subscribe({
      
      next: (response: ApiResponse) => {  // Ensure response type matches
        console.log('Login successfull', response);
        if (response.status) {  
          localStorage.setItem('accessToken', response.data);
          this.isLoggedIn = true;
          this.router.navigate(['/task-view']);
        } else {
          this.loginError = response.message;
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginError = 'Invalid email or password';
      },
    });
  }
  onLogout() {
    localStorage.removeItem('accessToken'); // Remove user from localStorage
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page
  }
}
