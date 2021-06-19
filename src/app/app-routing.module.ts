import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {LoginComponent} from './login/login.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';

import {
  OKTA_CONFIG,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';


export function onAuthRequired(oktaAuth, injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: LeftMenuComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {


}
