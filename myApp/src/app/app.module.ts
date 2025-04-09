import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskViewComponent } from './components/task-view/task-view.component';



@NgModule({
  declarations: [
    AppComponent,
    TaskHomeComponent,
    SignUpComponent,
    LoginComponent,
    TaskCreateComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
