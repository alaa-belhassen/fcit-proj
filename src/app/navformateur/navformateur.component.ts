import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navformateur',
  templateUrl: './navformateur.component.html',
  styleUrls: ['./navformateur.component.scss']
})
export class NavformateurComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  disconnect(){
    this.router.navigate(['/'])
    localStorage.clear();
  }
  name= localStorage.getItem('login');
  role= localStorage.getItem('role');
}
