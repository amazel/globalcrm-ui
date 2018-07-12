import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksComponent} from './tasks/tasks.component';
import {CompaniesComponent} from './companies/companies.component';
import {SalesComponent} from './sales/sales.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './auth/login/login.component';
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'sales', component: SalesComponent, canActivate: [AuthGuard]},
      {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
      {path: 'contacts/:id/edit', component: ContactEditComponent, canActivate: [AuthGuard]},
      {path: 'contacts/:id', component: ContactDetailComponent, canActivate: [AuthGuard]},
      {path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]},
      {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: '**', redirectTo: ''}
  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}
