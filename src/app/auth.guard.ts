import { Injectable } from '@angular/core';
import {  CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TestService } from './test.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router , private test:TestService){

  }
  role=localStorage.getItem('role');
  canActivate() {    
    if ( this.test.loggedIn()){
      return true;
  }else{
    this.route.navigate(['/']);
    return false;
  }
  
}
 
  
}
