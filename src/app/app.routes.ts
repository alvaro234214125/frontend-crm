import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { RolesPageComponent } from './components/roles-page/roles-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: UserProfileComponent },
      { path: 'help', component: HelpComponent },
      {
        path: 'roles',
        component: RolesPageComponent,
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'users',
        component: UsersPageComponent,
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'no-autorizado',
    loadComponent: () =>
      import('./components/access-denied/access-denied.component').then(
        m => m.AccessDeniedComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
