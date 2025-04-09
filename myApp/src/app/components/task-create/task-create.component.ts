import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  employees: any[] = [];
  timeZones: string[] = [
    'UTC', 'America/New_York', 'Europe/London', 'Asia/Kolkata', 'Asia/Dubai'
  ];

  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.taskForm = new FormGroup({
      task: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      employeeId: new FormControl('', [Validators.required, Validators.min(1)]),
      deadline: new FormControl('', Validators.required),
      timeZone: new FormControl('Asia/Kolkata', Validators.required)
    });

    
    // Fetch Employees and Store
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Submitting Task:', taskData);
      const apiUrl = 'http://localhost:8080/tasks/create';

      this.http.post<ApiResponse>(apiUrl, taskData).subscribe({
        next: (response) => {
          console.log('Task created successfully', response);
          alert('Task Created Successfully!');
          // this.taskForm.reset(); // Reset form after submission
        },
        error: (error) => {
          console.error('Task creation failed', error);
          alert('Task Creation Failed!');
        }
      });
    }
  }
}
  