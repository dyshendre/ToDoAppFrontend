import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Required validation
    email: new FormControl('', [Validators.required, Validators.email]), // Email validation
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Min length validation
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
    }
  }
}
