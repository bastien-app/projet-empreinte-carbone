import { Routes } from '@angular/router';
import {SummaryComponent} from './composants/summary/summary.component';
import {HomeComponent} from './composants/home/home.component';
import {ProfilComponent} from './composants/profil/profil.component';
import {userLoginGuardGuard} from './user-login-guard.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'summary', component: SummaryComponent, canActivate:[userLoginGuardGuard]},
  {path: 'profil/:login', component: ProfilComponent, canActivate:[userLoginGuardGuard]},
];
