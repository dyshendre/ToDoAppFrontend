import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';

const routes: Routes = [
  // { path: '', component: TaskHomeComponent }, // Default route
  { path: 'task-home', component: TaskHomeComponent }, // Home Page
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'task-view', component: TaskViewComponent},
  { path: 'task-update', component: TaskUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
