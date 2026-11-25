import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from './services/user.service';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })


export class userLoginGuardGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.service.getUsername() != "" && this.service.getUsername().trim().length > 0){
      return true;
    }
    else {
      this.router.navigate(['/']).then(() => false);
    }
  }
}
