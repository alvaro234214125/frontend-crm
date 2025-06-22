import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkAccess(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkAccess(route);
  }

  private checkAccess(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRoles: string[] = route.data['roles'] || [];

    return this.auth.isAuthenticated$().pipe(
      switchMap(isAuth => {
        if (!isAuth) {
          return of(this.router.createUrlTree(['/login']));
        }

        const user = this.auth.getCurrentUser();

        if (expectedRoles.length === 0 || expectedRoles.includes(user?.role?.name)) {
          return of(true);
        }

        return of(this.router.createUrlTree(['/no-autorizado']));
      })
    );
  }
}
