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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GuardResult> {
    let user = await this.service.getUsername();
    if( user != "" && user.trim().length > 0){
      return true;
    }
    else {
      return this.router.navigate(['/']).then(() => false);
    }
  }
}
