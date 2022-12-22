import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.scss']
})
export class NavadminComponent implements OnInit {

  constructor(private router:Router) { }
//,'liste des formateurs','listes des formations','suivi de progression'
  ngOnInit(): void {
    console.log(this.router.url)
  }
  active=false;
expand(){
  
  this.active=! this.active;
}
disconnect(){
  this.router.navigate(['/'])
  localStorage.clear();
}
  name= localStorage.getItem('login');
  role= localStorage.getItem('role');
}
