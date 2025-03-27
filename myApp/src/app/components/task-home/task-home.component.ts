import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent {
  constructor(private http: HttpClient, private router: Router) {}
  viewTask() {
    this.router.navigate(['/task-view']); // Redirect to Task Create Page
  }
}
