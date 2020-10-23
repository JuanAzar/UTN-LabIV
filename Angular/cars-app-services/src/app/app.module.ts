import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAddComponent,
    StudentListComponent,
    StudentViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
