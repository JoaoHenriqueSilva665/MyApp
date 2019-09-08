import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs/operators';
import {  Router, 
          CanActivate, 
          ActivatedRouteSnapshot, 
          RouterStateSnapshot, 
          CanActivateChild, 
          CanLoad, 
          Route, 
          UrlSegment} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router:Router, private authService: AuthService){}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.checkAuthState(state.url);
  }

  canActivateChild(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.canActivate(router, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>{
    const url = segments.map(s => `/${s}`).join('');
    return this.checkAuthState(url).pipe(take(1));
  }


  private checkAuthState(redirect: string): Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: {redirect}
          });
        }
      })
    );
  }
}
