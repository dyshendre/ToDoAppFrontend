import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent  implements OnInit{
  tasks: any[] = [];
  editForm!: FormGroup;
  editingTaskId: number | null = null;
  employeeId!: number;

  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.getTasks();
    this.editForm = this.fb.group({
      task: [''],
      taskDescription: [''],
      deadline: ['']
    });
  }

 getTasks() {
  this.http.get<{ status: boolean; data: any[]; message: string; statusCode: string }>
  ('http://localhost:8080/tasks')
    .subscribe({
      next: (response) => {
        this.tasks = response.data;  // ✅ Now correctly accessing the 'data' array
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }
    startEdit(task: any) {
      console.log("task===>",task);
      this.employeeId=Number(task.employee.id);
      this.editingTaskId = task.taskId;
      this.editForm.setValue({
        task: task.task,
        taskDescription: task.taskDescription,
        deadline: task.deadline
      });
    }

  saveTask(taskId: number) {
    const updatedTask = this.editForm.value;
    const payload={
      task: updatedTask.task,
      taskDescription: updatedTask.taskDescription,
      employeeId: this.employeeId,
      deadline: updatedTask.deadline,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    console.log("updatedTask===>",payload);
    this.http.put(`http://localhost:8080/tasks/${taskId}/update`, payload).subscribe({
      next: () => {
        this.getTasks();
        this.editingTaskId = null;
      },
      error: (err) => console.error('Error updating task:', err)
    });
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.http.delete(`http://localhost:8080/tasks/${taskId}`).subscribe({
        next: () => this.getTasks(),
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }

  addTask() {
    this.router.navigate(['/task-create']); // Redirect to Task Create Page
  }
}
