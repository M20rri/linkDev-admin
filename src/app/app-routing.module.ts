import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vacancy', component: PostComponent },
  { path: 'vacancy-details/:id', component: PostDetailComponent },
  { path: 'create-vacancy', component: VacancyFormComponent },
  { path: 'update-vacancy/:id', component: VacancyFormComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
