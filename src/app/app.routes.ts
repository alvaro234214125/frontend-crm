import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { RolesPageComponent } from './components/roles-page/roles-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { PaymentsPageComponent } from './components/payments-page/payments-page.component';
import { QuotationPageComponent } from './components/quotation-page/quotation-page.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { InteractionsPageComponent } from './components/interactions-page/interactions-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { InvoicesPageComponent } from './components/invoices-page/invoices-page.component'; 

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
      {
        path: 'client',
        component: ClientsPageComponent
      },
      {
        path: 'payments',
        component: PaymentsPageComponent
      },
      {
        path: 'quotations',
        component: QuotationPageComponent
      },
      {
        path: 'products',
        component: ProductsPageComponent
      },
      {
        path: 'contacts',
        component: ContactsPageComponent
      },
      {
        path: 'interactions',
        component: InteractionsPageComponent
      },
      {
        path: 'invoices',
        component: InvoicesPageComponent
      },
      {
        path: 'tasks',
        component: TasksPageComponent
      }
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
