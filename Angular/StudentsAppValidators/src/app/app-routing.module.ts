import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'add', component: StudentAddComponent },
  { path: 'view/:id', component: StudentViewComponent },
  { path: 'list', component: StudentListComponent },  
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
