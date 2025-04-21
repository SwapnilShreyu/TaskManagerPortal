import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginservice } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  fullLink: string = "";
  routelink: any;

  constructor(private authService: loginservice, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("\n guard condition - if suceess");
      return true
    } else {
      this.fullLink = window.location.href;
      this.routelink = this.fullLink.substring(this.fullLink.indexOf('/home') + 6)
      this.authService.setRedirectUrl(this.routelink);
      console.log("\n guard condition - else block");
      this.router.navigate(['/login'])
      return false
    }
  }

}
