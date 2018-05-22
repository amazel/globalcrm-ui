import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksComponent} from './tasks/tasks.component';
import {CompaniesComponent} from './companies/companies.component';
import {SalesComponent} from './sales/sales.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {AuthGuard} from './auth/auth-guard.service';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'sales', component: SalesComponent},
  {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
  {path: 'contacts/:id', component: ContactDetailComponent, canActivate: [AuthGuard]},
  {path: 'companies', component: CompaniesComponent},
  {path: 'tasks', component: TasksComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}
