import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ) },
  { path: 'reactive', loadChildren: () => import( './reactive/reactive.module' ).then( m => m.ReactiveModule ) },
  { path: '', redirectTo: 'reactive', pathMatch: 'full' },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
